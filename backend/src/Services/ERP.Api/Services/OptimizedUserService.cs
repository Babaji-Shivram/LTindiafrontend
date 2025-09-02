using ERP.Api.DTOs;
using ERP.Api.Services.Interfaces;
using ERP.BuildingBlocks.Data.Context;
using ERP.BuildingBlocks.Data.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using System.Linq.Expressions;

namespace ERP.Api.Services
{
    public class OptimizedUserService : IUserService
    {
        private readonly ILogger<OptimizedUserService> _logger;
        private readonly ImportUatDbContext _context;
        private readonly IMemoryCache _cache;
        private readonly TimeSpan _cacheExpiry = TimeSpan.FromMinutes(5);

        public OptimizedUserService(ILogger<OptimizedUserService> logger, ImportUatDbContext context, IMemoryCache cache)
        {
            _logger = logger;
            _context = context;
            _cache = cache;
        }

        public async Task<UserListResponse> GetUsersAsync(int page = 1, int pageSize = 10, string? search = null, 
            int? roleId = null, bool? isEmailVerified = null, int? loggedInUserId = null)
        {
            try
            {
                _logger.LogInformation("OPTIMIZED: Getting users - Page: {Page}, PageSize: {PageSize}, Search: '{Search}', RoleId: {RoleId}", 
                    page, pageSize, search, roleId);

                // Create cache key
                var cacheKey = $"users_{page}_{pageSize}_{search}_{roleId}_{isEmailVerified}";
                
                // Try to get from cache first
                if (_cache.TryGetValue(cacheKey, out UserListResponse? cachedResult) && cachedResult != null)
                {
                    _logger.LogInformation("Returning cached result for users query");
                    return cachedResult;
                }

                // Optimize the query by building it incrementally
                var baseQuery = _context.BsUserMs.AsNoTracking(); // NoTracking for read-only queries
                
                // Apply filters
                if (!string.IsNullOrEmpty(search))
                {
                    baseQuery = baseQuery.Where(u => EF.Functions.Like(u.SName, $"%{search}%") || 
                                                   EF.Functions.Like(u.SEmail, $"%{search}%"));
                }

                if (roleId.HasValue)
                {
                    baseQuery = baseQuery.Where(u => u.LRoleId == roleId.Value);
                }

                if (isEmailVerified.HasValue)
                {
                    baseQuery = baseQuery.Where(u => !string.IsNullOrEmpty(u.SEmail) == isEmailVerified.Value);
                }

                // Get total count efficiently
                var totalCount = await baseQuery.CountAsync();

                // Handle pagination limits
                pageSize = Math.Min(pageSize <= 0 ? 50 : pageSize, 100);
                var totalPages = (int)Math.Ceiling((double)totalCount / pageSize);

                // Execute paginated query with minimal joins
                var users = await baseQuery
                    .OrderBy(u => u.SName)
                    .Skip((page - 1) * pageSize)
                    .Take(pageSize)
                    .Select(u => new // Project only needed fields
                    {
                        User = u,
                        UserDetail = _context.BsUserDetails.FirstOrDefault(ud => ud.UserId == u.LId),
                        Department = _context.BsUserDetails.Where(ud => ud.UserId == u.LId)
                            .Join(_context.BsDeptMs, ud => ud.DeptId, d => d.Lid, (ud, d) => d)
                            .FirstOrDefault(),
                        Role = u.LRoleId.HasValue ? _context.BsRoleMs.FirstOrDefault(r => r.LRoleId == u.LRoleId) : null
                    })
                    .ToListAsync();

                var userDtos = users.Select(u => MapToOptimizedUserDto(u.User, u.UserDetail, u.Department, u.Role)).ToList();

                var result = new UserListResponse
                {
                    users = userDtos,
                    totalCount = totalCount,
                    pageSize = pageSize,
                    pageNumber = page,
                    totalPages = totalPages
                };

                // Cache the result
                _cache.Set(cacheKey, result, _cacheExpiry);

                _logger.LogInformation("OPTIMIZED: Retrieved {Count} users (page {Page} of {TotalPages}, total: {Total})", 
                    userDtos.Count, page, totalPages, totalCount);

                return result;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting users with optimization");
                throw;
            }
        }

        public async Task<UserDto?> GetUserByIdAsync(int id)
        {
            try
            {
                var cacheKey = $"user_{id}";
                
                if (_cache.TryGetValue(cacheKey, out UserDto? cachedUser) && cachedUser != null)
                {
                    return cachedUser;
                }

                var userData = await _context.BsUserMs
                    .AsNoTracking()
                    .Where(u => u.LId == id)
                    .Select(u => new
                    {
                        User = u,
                        UserDetail = _context.BsUserDetails.FirstOrDefault(ud => ud.UserId == u.LId),
                        Department = _context.BsUserDetails.Where(ud => ud.UserId == u.LId)
                            .Join(_context.BsDeptMs, ud => ud.DeptId, d => d.Lid, (ud, d) => d)
                            .FirstOrDefault(),
                        Role = u.LRoleId.HasValue ? _context.BsRoleMs.FirstOrDefault(r => r.LRoleId == u.LRoleId) : null
                    })
                    .FirstOrDefaultAsync();

                if (userData == null) return null;

                var userDto = MapToOptimizedUserDto(userData.User, userData.UserDetail, userData.Department, userData.Role);
                
                _cache.Set(cacheKey, userDto, _cacheExpiry);
                
                return userDto;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting user by ID: {Id}", id);
                throw;
            }
        }

        private UserDto MapToOptimizedUserDto(BsUserM user, BsUserDetail? userDetail, BsDeptM? dept, BsRoleM? role)
        {
            return new UserDto
            {
                id = user.LId,
                userName = user.SName,
                email = user.SEmail,
                firstName = GetFirstName(user.SName),
                lastName = GetLastName(user.SName),
                fullName = user.SName,
                phoneNumber = userDetail?.MobileNo,
                profilePicture = user.SignImgPath,
                department = dept?.DeptName,
                position = null,
                employeeId = user.SCode,
                isActive = user.LoginActive,
                isLocked = user.BDel,
                isEmailVerified = !string.IsNullOrEmpty(user.SEmail),
                twoFactorEnabled = false,
                twoFactorSetupDate = null,
                createdDate = user.DtDate,
                lastLoginDate = user.LastLoginDate,
                lastLoginLocation = user.IpAddress,
                previousLoginDate = null,
                loginAttempts = 0,
                lastFailedLoginDate = null,
                roleId = user.LRoleId ?? 0,
                roleName = role?.SName ?? GetRoleName(user.LRoleId ?? 0),
                status = user.LoginActive ? "Active" : "Inactive",
                empCode = userDetail?.Empcode,
                contactNo = userDetail?.MobileNo,
                deptName = dept?.DeptName,
                divisionName = null, // Optimize this later if needed
                address = userDetail?.Address,
                codeReset = (user.LRoleId == -1 || user.LRoleId == 1) ? "Yes" : "No"
            };
        }

        private static string GetFirstName(string fullName) => 
            string.IsNullOrEmpty(fullName) ? "" : fullName.Split(' ').FirstOrDefault() ?? "";

        private static string GetLastName(string fullName) => 
            string.IsNullOrEmpty(fullName) ? "" : string.Join(" ", fullName.Split(' ').Skip(1));

        private static string GetRoleName(int roleId)
        {
            return roleId switch
            {
                -1 => "Super Admin",
                1 => "Admin", 
                2 => "Manager",
                3 => "User",
                _ => "Unknown"
            };
        }

        // Implement required interface methods
        public async Task<UserDetailResponse?> GetUserDetailAsync(int id)
        {
            var user = await GetUserByIdAsync(id);
            return user != null ? new UserDetailResponse { User = user } : null;
        }

        public async Task<UserDto?> GetUserByUsernameAsync(string username)
        {
            var user = await _context.BsUserMs.AsNoTracking()
                .FirstOrDefaultAsync(u => u.SName == username);
            return user != null ? MapToOptimizedUserDto(user, null, null, null) : null;
        }

        public async Task<UserDto> CreateUserAsync(UserDto userDto)
        {
            // Implementation for create user - keeping it simple for now
            var user = new BsUserM
            {
                SName = userDto.userName,
                SEmail = userDto.email,
                SCode = userDto.employeeId,
                LoginActive = userDto.isActive,
                BDel = userDto.isLocked,
                DtDate = DateTime.UtcNow,
                LRoleId = userDto.roleId
            };

            _context.BsUserMs.Add(user);
            await _context.SaveChangesAsync();
            
            return await GetUserByIdAsync(user.LId) ?? userDto;
        }

        public async Task<UserDto?> UpdateUserAsync(int id, UserDto userDto)
        {
            var user = await _context.BsUserMs.FindAsync(id);
            if (user == null) return null;

            user.SName = userDto.userName;
            user.SEmail = userDto.email;
            user.LoginActive = userDto.isActive;
            user.BDel = userDto.isLocked;
            user.UpdDate = DateTime.UtcNow;
            
            await _context.SaveChangesAsync();
            
            // Invalidate cache
            _cache.Remove($"user_{id}");
            
            return await GetUserByIdAsync(id);
        }

        public async Task<bool> DeleteUserAsync(int id)
        {
            var user = await _context.BsUserMs.FindAsync(id);
            if (user == null) return false;

            user.BDel = true; // Soft delete
            user.UpdDate = DateTime.UtcNow;
            
            await _context.SaveChangesAsync();
            
            // Invalidate cache
            _cache.Remove($"user_{id}");
            
            return true;
        }
    }
}
