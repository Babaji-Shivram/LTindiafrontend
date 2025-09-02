using HotChocolate;
using HotChocolate.Types;
using Microsoft.EntityFrameworkCore;
using ERP.Api.Services.Interfaces;
using ERP.Api.DTOs;

namespace ERP.Api.GraphQL.Queries;

[ExtendObjectType("Query")]
public class UserQueries
{
    /// <summary>
    /// Get users with pagination and filtering - optimized with GraphQL
    /// </summary>
    public async Task<ERP.Api.DTOs.UserListResponse> GetUsersAsync(
        [Service] IUserService userService,
        int page = 1,
        int pageSize = 10,
        string? search = null,
        int? roleId = null,
        bool? isEmailVerified = null,
        int? loggedInUserId = null)
    {
        // Use the existing service method that already has the optimized JOIN queries
        return await userService.GetUsersAsync(page, pageSize, search, roleId, isEmailVerified, loggedInUserId);
    }
    
    /// <summary>
    /// Get a specific user by ID with all details
    /// </summary>
    public async Task<UserDto?> GetUserByIdAsync(
        [Service] IUserService userService,
        int id)
    {
        return await userService.GetUserByIdAsync(id);
    }
    
    /// <summary>
    /// Get users count for quick statistics
    /// </summary>
    public async Task<int> GetUsersCountAsync(
        [Service] IUserService userService,
        string? search = null,
        int? roleId = null,
        bool? isEmailVerified = null)
    {
        var result = await userService.GetUsersAsync(1, 1, search, roleId, isEmailVerified, null);
        return result.totalCount;
    }
}
