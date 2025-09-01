using ERP.Identity.Domain.Entities;
using ERP.BuildingBlocks.Data.Models;

namespace ERP.Identity.Infrastructure.Services;

public class UserMappingService
{
    /// <summary>
    /// Maps BsUserM (database model) to User (domain model)
    /// </summary>
    public static User MapToUser(BsUserM dbUser)
    {
        if (dbUser == null) return null;

        var roles = GetUserRoles(dbUser.LType, dbUser.LRoleId);
        var permissions = GetUserPermissions(dbUser.LType, dbUser.LRoleId);

        return new User
        {
            Id = dbUser.LId,
            Username = dbUser.SName,
            Email = dbUser.SEmail,
            PasswordHash = dbUser.SCode ?? string.Empty, // Using SCode as password hash
            FirstName = ExtractFirstName(dbUser.SName),
            LastName = ExtractLastName(dbUser.SName),
            IsActive = dbUser.LoginActive,
            CreatedAt = dbUser.DtDate,
            LastLoginAt = dbUser.LastLoginDate,
            Roles = roles,
            Permissions = permissions,
            UserType = dbUser.LType,
            RoleId = dbUser.LRoleId
        };
    }

    /// <summary>
    /// Gets user roles based on LType
    /// LType: -1 = Super Admin, 1 = Babaji Employee, 2 = Customer Employee
    /// </summary>
    private static List<string> GetUserRoles(int userType, int? roleId)
    {
        var roles = new List<string>();

        switch (userType)
        {
            case -1:
                roles.Add("SuperAdmin");
                roles.Add("Admin");
                roles.Add("User");
                break;
            case 1:
                roles.Add("Employee");
                roles.Add("User");
                // Add specific role based on RoleId if needed
                if (roleId.HasValue)
                {
                    roles.Add($"Role_{roleId.Value}");
                }
                break;
            case 2:
                roles.Add("Customer");
                roles.Add("User");
                break;
            default:
                roles.Add("User");
                break;
        }

        return roles;
    }

    /// <summary>
    /// Gets user permissions based on LType and role
    /// </summary>
    private static List<string> GetUserPermissions(int userType, int? roleId)
    {
        var permissions = new List<string>();

        switch (userType)
        {
            case -1: // Super Admin
                permissions.AddRange(new[]
                {
                    "users.read", "users.write", "users.delete",
                    "customers.read", "customers.write", "customers.delete",
                    "jobs.read", "jobs.write", "jobs.delete",
                    "invoices.read", "invoices.write", "invoices.delete",
                    "reports.read", "reports.write",
                    "settings.read", "settings.write",
                    "admin.full_access"
                });
                break;
            
            case 1: // Babaji Employee
                permissions.AddRange(new[]
                {
                    "jobs.read", "jobs.write",
                    "customers.read", "customers.write",
                    "invoices.read", "invoices.write",
                    "reports.read",
                    "employee.access"
                });
                break;
            
            case 2: // Customer Employee
                permissions.AddRange(new[]
                {
                    "jobs.read",
                    "invoices.read",
                    "reports.read",
                    "customer.access"
                });
                break;
            
            default:
                permissions.Add("basic.access");
                break;
        }

        return permissions;
    }

    private static string ExtractFirstName(string fullName)
    {
        if (string.IsNullOrWhiteSpace(fullName)) return string.Empty;
        var parts = fullName.Split(' ', StringSplitOptions.RemoveEmptyEntries);
        return parts.Length > 0 ? parts[0] : string.Empty;
    }

    private static string ExtractLastName(string fullName)
    {
        if (string.IsNullOrWhiteSpace(fullName)) return string.Empty;
        var parts = fullName.Split(' ', StringSplitOptions.RemoveEmptyEntries);
        return parts.Length > 1 ? string.Join(" ", parts.Skip(1)) : string.Empty;
    }
}
