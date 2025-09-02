using HotChocolate;
using ERP.BuildingBlocks.Data.Models;

namespace ERP.Api.GraphQL.Types;

public class UserType : ObjectType<BsUserM>
{
    protected override void Configure(IObjectTypeDescriptor<BsUserM> descriptor)
    {
        descriptor.Name("User");
        
        descriptor.Field(u => u.LId).Name("id").Type<NonNullType<IdType>>();
        descriptor.Field(u => u.SName).Name("name").Type<NonNullType<StringType>>();
        descriptor.Field(u => u.SEmail).Name("email").Type<NonNullType<StringType>>();
        descriptor.Field(u => u.LType).Name("userType").Type<NonNullType<IntType>>();
        descriptor.Field(u => u.LRoleId).Name("roleId").Type<IntType>();
        descriptor.Field(u => u.SCode).Name("code").Type<StringType>();
        descriptor.Field(u => u.ResetCode).Name("resetCode").Type<BooleanType>();
        descriptor.Field(u => u.ResetDays).Name("resetDays").Type<IntType>();
        descriptor.Field(u => u.CodeValidTillDate).Name("codeValidTillDate").Type<DateTimeType>();
        descriptor.Field(u => u.IsMailSent).Name("isMailSent").Type<BooleanType>();
        descriptor.Field(u => u.BDel).Name("isDeleted").Type<BooleanType>();
        descriptor.Field(u => u.DtDate).Name("createdDate").Type<DateTimeType>();
        descriptor.Field(u => u.UpdDate).Name("updatedDate").Type<DateTimeType>();
        descriptor.Field(u => u.LastLoginDate).Name("lastLoginDate").Type<DateTimeType>();
        descriptor.Field(u => u.LoginActive).Name("loginActive").Type<BooleanType>();
        descriptor.Field(u => u.IsAvailable).Name("isAvailable").Type<BooleanType>();
        descriptor.Field(u => u.AccessContract).Name("accessContract").Type<StringType>();
        descriptor.Field(u => u.SignImgPath).Name("signImgPath").Type<StringType>();
        descriptor.Field(u => u.IpAddress).Name("ipAddress").Type<StringType>();
        
        // Navigation properties - will be added later with DataLoaders
        // descriptor.Field("userDetail")
        //     .Type<UserDetailType>()
        //     .Resolve(async context =>
        //     {
        //         var userDetailLoader = context.DataLoader<UserDetailByUserIdDataLoader>();
        //         return await userDetailLoader.LoadAsync(context.Parent<BsUserM>().LId);
        //     });
            
        // descriptor.Field("role")
        //     .Type<RoleType>()
        //     .Resolve(async context =>
        //     {
        //         var user = context.Parent<BsUserM>();
        //         if (user.LRoleId == null) return null;
        //         
        //         var roleLoader = context.DataLoader<RoleByIdDataLoader>();
        //         return await roleLoader.LoadAsync(user.LRoleId.Value);
        //     });
    }
}
