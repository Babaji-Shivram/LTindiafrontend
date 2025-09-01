using ERP.BuildingBlocks.Data.DTOs;
using ERP.BuildingBlocks.Data.Interfaces;
using ERP.BuildingBlocks.Data.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace ERP.BuildingBlocks.Data.Services;

public class RoleDataService : IRoleDataService
{
    private readonly ImportUatDbContext _context;
    private readonly ILogger<RoleDataService> _logger;

    public RoleDataService(ImportUatDbContext context, ILogger<RoleDataService> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task<IEnumerable<RoleDto>> GetUserRolesAsync(int userId)
    {
        try
        {
            // TODO: Implement proper role mapping based on your database schema
            // This is a placeholder implementation
            var roles = await _context.BsRoleMs
                .Where(r => r.BDel == 0)
                .Select(r => new RoleDto
                {
                    Id = r.LRoleId,
                    RoleName = r.SName ?? "",
                    Description = r.SRemarks,
                    IsActive = r.BDel == 0
                })
                .ToListAsync();

            return roles;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting user roles for user: {UserId}", userId);
            return Enumerable.Empty<RoleDto>();
        }
    }

    public async Task<IEnumerable<PermissionDto>> GetUserPermissionsAsync(int userId)
    {
        try
        {
            // TODO: Implement proper permission mapping based on your database schema
            // This is a placeholder implementation
            var permissions = await _context.BsRoleDetails
                .Where(rd => rd.BDel == 0)
                .Select(rd => new PermissionDto
                {
                    Id = rd.LId,
                    PermissionName = rd.STaskId ?? "",
                    Description = rd.Ctyp,
                    ModuleName = rd.STaskId ?? ""
                })
                .Distinct()
                .ToListAsync();

            return permissions;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting user permissions for user: {UserId}", userId);
            return Enumerable.Empty<PermissionDto>();
        }
    }

    public async Task<RoleDto?> GetRoleByIdAsync(int roleId)
    {
        try
        {
            var role = await _context.BsRoleMs
                .FirstOrDefaultAsync(r => r.LRoleId == roleId);

            return role != null ? new RoleDto
            {
                Id = role.LRoleId,
                RoleName = role.SName ?? "",
                Description = role.SRemarks,
                IsActive = role.BDel == 0
            } : null;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting role by ID: {RoleId}", roleId);
            return null;
        }
    }

    public async Task<IEnumerable<RoleDto>> GetAllRolesAsync()
    {
        try
        {
            var roles = await _context.BsRoleMs
                .Where(r => r.BDel == 0)
                .Select(r => new RoleDto
                {
                    Id = r.LRoleId,
                    RoleName = r.SName ?? "",
                    Description = r.SRemarks,
                    IsActive = r.BDel == 0
                })
                .ToListAsync();

            return roles;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting all roles");
            return Enumerable.Empty<RoleDto>();
        }
    }

    public async Task<bool> AssignRoleToUserAsync(int userId, int roleId)
    {
        // This is a placeholder - implement based on your business logic
        throw new NotImplementedException("Role assignment not implemented yet");
    }

    public async Task<bool> RemoveRoleFromUserAsync(int userId, int roleId)
    {
        // This is a placeholder - implement based on your business logic
        throw new NotImplementedException("Role removal not implemented yet");
    }
}
