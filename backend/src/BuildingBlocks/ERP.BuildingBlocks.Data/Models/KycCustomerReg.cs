using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class KycCustomerReg
{
    public int Lid { get; set; }

    public string? UniqId { get; set; }

    public string? CustomerName { get; set; }

    public string? CorporateAddress1 { get; set; }

    public string? CorporateAddress2 { get; set; }

    public string? CorporateContactPerson { get; set; }

    public string? EmailId { get; set; }

    public string? MobileNumberDel { get; set; }

    public string? ContactNumberDel { get; set; }

    public bool? Svbapplicable { get; set; }

    public bool? TransporationbyBabaji { get; set; }

    public bool? ChecklistApprovalRequired { get; set; }

    public bool? Pcdrequired { get; set; }

    public string? ReferedBy { get; set; }

    public string? BranchNameDel { get; set; }

    public string? PlantNameDel { get; set; }

    public string? BillingAddressDel { get; set; }

    public string? BillingCityDel { get; set; }

    public string? PinCodeDel { get; set; }

    public string? ContactPersonNameDel { get; set; }

    public string? ContactPersonMobileDel { get; set; }

    public string? ContactPersonEmailIdDel { get; set; }

    public string? PostClearanceDocDispatchAddressDel { get; set; }

    public string? PostClearanceDocumentDispatchCityDel { get; set; }

    public string? ConsigneeName { get; set; }

    public string? Ieccode { get; set; }

    public string? Remark { get; set; }

    public DateTime? DtDate { get; set; }

    public bool? BDel { get; set; }

    public int? VendorId { get; set; }

    public string? BinNo { get; set; }
}
