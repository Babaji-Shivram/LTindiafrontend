using HotChocolate;

namespace ERP.Api.GraphQL.Types;

/// <summary>
/// Combined user data similar to the UserDto from REST API
/// </summary>
public class UserWithDetailsType
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public string Email { get; set; } = null!;
    public int UserType { get; set; }
    public int? RoleId { get; set; }
    public string? RoleName { get; set; }
    public string? EmpCode { get; set; }
    public string? ContactNo { get; set; }
    public string? DeptName { get; set; }
    public string? DivisionName { get; set; }
    public string? Address { get; set; }
    public int? LocationId { get; set; }
    public string? LedgerCode { get; set; }
    public bool? ResetCodeRequired { get; set; }
    public string? ActiveStatus { get; set; }
    public string? AccessContract { get; set; }
    public string? SignImgPath { get; set; }
    public DateTime? CreatedDate { get; set; }
    public DateTime? LastLoginDate { get; set; }
    public bool? IsAvailable { get; set; }
}

public class UserWithDetailsObjectType : ObjectType<UserWithDetailsType>
{
    protected override void Configure(IObjectTypeDescriptor<UserWithDetailsType> descriptor)
    {
        descriptor.Name("UserWithDetails");
        
        descriptor.Field(u => u.Id).Type<NonNullType<IdType>>();
        descriptor.Field(u => u.Name).Type<NonNullType<StringType>>();
        descriptor.Field(u => u.Email).Type<NonNullType<StringType>>();
        descriptor.Field(u => u.UserType).Type<NonNullType<IntType>>();
        descriptor.Field(u => u.RoleId).Type<IntType>();
        descriptor.Field(u => u.RoleName).Type<StringType>();
        descriptor.Field(u => u.EmpCode).Type<StringType>();
        descriptor.Field(u => u.ContactNo).Type<StringType>();
        descriptor.Field(u => u.DeptName).Type<StringType>();
        descriptor.Field(u => u.DivisionName).Type<StringType>();
        descriptor.Field(u => u.Address).Type<StringType>();
        descriptor.Field(u => u.LocationId).Type<IntType>();
        descriptor.Field(u => u.LedgerCode).Type<StringType>();
        descriptor.Field(u => u.ResetCodeRequired).Type<BooleanType>();
        descriptor.Field(u => u.ActiveStatus).Type<StringType>();
        descriptor.Field(u => u.AccessContract).Type<StringType>();
        descriptor.Field(u => u.SignImgPath).Type<StringType>();
        descriptor.Field(u => u.CreatedDate).Type<DateTimeType>();
        descriptor.Field(u => u.LastLoginDate).Type<DateTimeType>();
        descriptor.Field(u => u.IsAvailable).Type<BooleanType>();
    }
}

public class UserListResponse
{
    public IEnumerable<UserWithDetailsType> Users { get; set; } = new List<UserWithDetailsType>();
    public int TotalCount { get; set; }
    public int Page { get; set; }
    public int PageSize { get; set; }
    public int TotalPages { get; set; }
}

public class UserListResponseType : ObjectType<UserListResponse>
{
    protected override void Configure(IObjectTypeDescriptor<UserListResponse> descriptor)
    {
        descriptor.Name("UserListResponse");
        
        descriptor.Field(r => r.Users).Type<NonNullType<ListType<NonNullType<UserWithDetailsObjectType>>>>();
        descriptor.Field(r => r.TotalCount).Type<NonNullType<IntType>>();
        descriptor.Field(r => r.Page).Type<NonNullType<IntType>>();
        descriptor.Field(r => r.PageSize).Type<NonNullType<IntType>>();
        descriptor.Field(r => r.TotalPages).Type<NonNullType<IntType>>();
    }
}
