using HotChocolate;
using ERP.BuildingBlocks.Data.Models;

namespace ERP.Api.GraphQL.Types;

public class UserDetailType : ObjectType<BsUserDetail>
{
    protected override void Configure(IObjectTypeDescriptor<BsUserDetail> descriptor)
    {
        descriptor.Name("UserDetail");
        
        descriptor.Field(ud => ud.LId).Name("id").Type<NonNullType<IdType>>();
        descriptor.Field(ud => ud.UserId).Name("userId").Type<NonNullType<IntType>>();
        descriptor.Field(ud => ud.Empcode).Name("empCode").Type<StringType>();
        descriptor.Field(ud => ud.MobileNo).Name("mobileNo").Type<StringType>();
        descriptor.Field(ud => ud.Address).Name("address").Type<StringType>();
        descriptor.Field(ud => ud.DeptId).Name("deptId").Type<NonNullType<IntType>>();
        descriptor.Field(ud => ud.DivisionId).Name("divisionId").Type<NonNullType<IntType>>();
        descriptor.Field(ud => ud.LocationId).Name("locationId").Type<IntType>();
        descriptor.Field(ud => ud.FaLedgerCode).Name("ledgerCode").Type<StringType>();
        descriptor.Field(ud => ud.BDel).Name("isDeleted").Type<BooleanType>();
        descriptor.Field(ud => ud.DtDate).Name("createdDate").Type<DateTimeType>();
        
        // Navigation properties - will be added later with DataLoaders
        // descriptor.Field("department")
        //     .Type<DepartmentType>()
        //     .Resolve(async context =>
        //     {
        //         var userDetail = context.Parent<BsUserDetail>();
        //         var deptLoader = context.DataLoader<DepartmentByIdDataLoader>();
        //         return await deptLoader.LoadAsync(userDetail.DeptId);
        //     });
            
        // descriptor.Field("division")
        //     .Type<DivisionType>()
        //     .Resolve(async context =>
        //     {
        //         var userDetail = context.Parent<BsUserDetail>();
        //         var divisionLoader = context.DataLoader<DivisionByIdDataLoader>();
        //         return await divisionLoader.LoadAsync(userDetail.DivisionId);
        //     });
    }
}
