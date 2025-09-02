using ERP.Api.DTOs;
using ERP.Api.Services.Interfaces;
using ERP.BuildingBlocks.Data.Context;
using ERP.BuildingBlocks.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace ERP.Api.Services
{
    public class UserService : IUserService
    {
        private readonly ILogger<UserService> _logger;
        private readonly ImportUatDbContext _context;

        public UserService(ILogger<UserService> logger, ImportUatDbContext context)
        {
            _logger = logger;
            _context = context;
        }

        private UserDto MapBsUserMToUserDto(BsUserM user)
        {
            return new UserDto
            {
                id = user.LId,
                userName = user.SName,
                email = user.SEmail,
                firstName = user.SName.Split(' ').FirstOrDefault() ?? "",
                lastName = user.SName.Split(' ').Skip(1).FirstOrDefault() ?? "",
                fullName = user.SName,
                phoneNumber = null, // Not available in BsUserM
                profilePicture = user.SignImgPath,
                department = null, // Not available in BsUserM - could be joined from role
                position = null, // Not available in BsUserM
                employeeId = user.SCode,
                isActive = user.LoginActive,
                isLocked = user.BDel,
                isEmailVerified = true, // Assuming verified if email exists
                twoFactorEnabled = false, // Default value
                twoFactorSetupDate = null,
                createdDate = user.DtDate,
                lastLoginDate = user.LastLoginDate,
                lastLoginLocation = user.IpAddress,
                previousLoginDate = null, // Not available in BsUserM
                loginAttempts = 0, // Not available in BsUserM
                lastFailedLoginDate = null, // Not available in BsUserM
                roleId = user.LRoleId ?? 0,
                roleName = GetRoleName(user.LRoleId ?? 0), // Helper method to get role name
                status = user.LoginActive ? "Active" : "Inactive"
            };
        }

        private string GetRoleName(int roleId)
        {
            return roleId switch
            {
                -1 => "Super Admin",
                1 => "Babaji Employee", 
                2 => "Customer Employee",
                _ => "Unknown"
            };
        }

        public async Task<UserListResponse> GetUsersAsync(int page = 1, int pageSize = 10, string? search = null, int? roleId = null, bool? isActive = null)
        {
            try
            {
                var query = _context.BsUserMs.Where(u => !u.BDel); // Exclude deleted users

                // Apply filters
                if (!string.IsNullOrEmpty(search))
                {
                    var searchLower = search.ToLower();
                    query = query.Where(u => 
                        u.SName.ToLower().Contains(searchLower) ||
                        u.SEmail.ToLower().Contains(searchLower) ||
                        (u.SCode != null && u.SCode.ToLower().Contains(searchLower)));
                }

                if (roleId.HasValue)
                {
                    query = query.Where(u => u.LRoleId == roleId.Value);
                }

                if (isActive.HasValue)
                {
                    query = query.Where(u => u.LoginActive == isActive.Value);
                }

                var totalCount = await query.CountAsync();

                // If pageSize is -1 or 0, return all users (no pagination)
                List<BsUserM> users;
                int totalPages;
                
                if (pageSize <= 0)
                {
                    users = await query
                        .OrderBy(u => u.SName)
                        .ToListAsync();
                    totalPages = 1;
                    pageSize = totalCount; // Set pageSize to total count for response
                    page = 1;
                }
                else
                {
                    totalPages = (int)Math.Ceiling((double)totalCount / pageSize);
                    users = await query
                        .OrderBy(u => u.SName)
                        .Skip((page - 1) * pageSize)
                        .Take(pageSize)
                        .ToListAsync();
                }

                var userDtos = users.Select(MapBsUserMToUserDto).ToList();

                _logger.LogInformation("Retrieved {Count} users from database (page {Page} of {TotalPages}, total: {TotalCount})", 
                    userDtos.Count, page, totalPages, totalCount);

                return new UserListResponse
                {
                    users = userDtos,
                    totalCount = totalCount,
                    pageSize = pageSize,
                    pageNumber = page,
                    totalPages = totalPages
                };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving users from database");
                throw;
            }
        }

        public async Task<UserDetailResponse?> GetUserDetailAsync(int id)
        {
            try
            {
                var user = await _context.BsUserMs
                    .Where(u => u.LId == id && !u.BDel)
                    .FirstOrDefaultAsync();
                
                if (user == null)
                    return null;

                var userDto = MapBsUserMToUserDto(user);

                return new UserDetailResponse
                {
                    User = userDto,
                    RecentLogins = await GetRecentLoginHistory(id),
                    ActiveSessions = await GetActiveSessions(id),
                    Stats = await GetUserStats(id)
                };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving user detail for ID: {UserId}", id);
                throw;
            }
        }

        public async Task<UserDto?> GetUserByIdAsync(int id)
        {
            try
            {
                var user = await _context.BsUserMs
                    .Where(u => u.LId == id && !u.BDel)
                    .FirstOrDefaultAsync();
                
                return user != null ? MapBsUserMToUserDto(user) : null;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving user by ID: {UserId}", id);
                throw;
            }
        }

        public async Task<UserDto> CreateUserAsync(UserDto user)
        {
            try
            {
                var newUser = new BsUserM
                {
                    SName = user.fullName,
                    SEmail = user.email,
                    SCode = user.userName,
                    LRoleId = user.roleId,
                    LType = 1, // Default user type
                    LoginActive = user.isActive,
                    BDel = false,
                    DtDate = DateTime.Now,
                    LUser = 1, // Default user ID for creation
                    UpdDate = DateTime.Now
                };

                _context.BsUserMs.Add(newUser);
                await _context.SaveChangesAsync();

                var createdUserDto = MapBsUserMToUserDto(newUser);
                
                _logger.LogInformation("Created new user: {UserName} (ID: {Id})", user.userName, newUser.LId);
                return createdUserDto;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating user: {UserName}", user.userName);
                throw;
            }
        }

        public async Task<UserDto?> UpdateUserAsync(int id, UserDto user)
        {
            try
            {
                var existingUser = await _context.BsUserMs
                    .Where(u => u.LId == id && !u.BDel)
                    .FirstOrDefaultAsync();
                
                if (existingUser == null)
                    return null;

                // Update properties
                existingUser.SName = user.fullName;
                existingUser.SEmail = user.email;
                existingUser.SCode = user.userName;
                existingUser.LRoleId = user.roleId;
                existingUser.LoginActive = user.isActive;
                existingUser.UpdDate = DateTime.Now;
                existingUser.UpdUser = 1; // Should be current user ID in production

                await _context.SaveChangesAsync();

                var updatedUserDto = MapBsUserMToUserDto(existingUser);
                
                _logger.LogInformation("Updated user: {UserName} (ID: {Id})", user.userName, id);
                return updatedUserDto;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating user: {UserId}", id);
                throw;
            }
        }

        public async Task<bool> DeleteUserAsync(int id)
        {
            try
            {
                var user = await _context.BsUserMs
                    .Where(u => u.LId == id && !u.BDel)
                    .FirstOrDefaultAsync();
                
                if (user == null)
                    return false;

                // Soft delete - set BDel to true instead of removing from database
                user.BDel = true;
                user.UpdDate = DateTime.Now;
                user.UpdUser = 1; // Should be current user ID in production

                await _context.SaveChangesAsync();
                
                _logger.LogInformation("Deleted user: {UserName} (ID: {Id})", user.SName, id);
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting user: {UserId}", id);
                throw;
            }
        }

        private async Task<List<LoginHistoryDto>> GetRecentLoginHistory(int userId)
        {
            await Task.Delay(30);
            return new List<LoginHistoryDto>
            {
                new LoginHistoryDto
                {
                    Id = 1,
                    UserId = userId,
                    LoginTime = DateTime.Now.AddHours(-2),
                    LogoutTime = null,
                    IpAddress = "192.168.1.100",
                    UserAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
                    DeviceType = "Desktop",
                    BrowserName = "Chrome",
                    Location = "Mumbai, India",
                    IsSuccessful = true
                },
                new LoginHistoryDto
                {
                    Id = 2,
                    UserId = userId,
                    LoginTime = DateTime.Now.AddDays(-1),
                    LogoutTime = DateTime.Now.AddDays(-1).AddHours(8),
                    IpAddress = "192.168.1.100",
                    UserAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
                    DeviceType = "Desktop",
                    BrowserName = "Chrome",
                    Location = "Mumbai, India",
                    IsSuccessful = true
                }
            };
        }

        private async Task<List<SessionDto>> GetActiveSessions(int userId)
        {
            await Task.Delay(30);
            return new List<SessionDto>
            {
                new SessionDto
                {
                    Id = Guid.NewGuid().ToString(),
                    UserId = userId,
                    LoginTime = DateTime.Now.AddHours(-2),
                    LastActivityTime = DateTime.Now.AddMinutes(-5),
                    IpAddress = "192.168.1.100",
                    DeviceType = "Desktop",
                    BrowserName = "Chrome",
                    Location = "Mumbai, India",
                    IsActive = true
                }
            };
        }

        private async Task<UserStatsDto> GetUserStats(int userId)
        {
            await Task.Delay(30);
            return new UserStatsDto
            {
                TotalLogins = 45,
                FailedLogins = 2,
                ActiveSessions = 1,
                LastActivity = DateTime.Now.AddMinutes(-5),
                DaysActive = 15
            };
        }
    }
}
