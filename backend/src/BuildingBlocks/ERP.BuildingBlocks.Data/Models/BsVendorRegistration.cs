using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsVendorRegistration
{
    public int Lid { get; set; }

    public Guid? Uid { get; set; }

    public string? NameofVendor { get; set; }

    public string? Addressr1 { get; set; }

    public string? Addressr2 { get; set; }

    public int? StateId { get; set; }

    public string? City { get; set; }

    public string? PinNo { get; set; }

    public string? TeliphonNo { get; set; }

    public string? FaxNo { get; set; }

    public string? WebSiteAddres { get; set; }

    public int? ConstitutionId { get; set; }

    public string? CompanyIncorporationNo { get; set; }

    public string? PlaceOfIncorportaion { get; set; }

    public DateTime? DateofIncorporation { get; set; }

    public int? NatureofBusiness { get; set; }

    public string? ContactPersonNameDel { get; set; }

    public string? ContactPersonNumberDel { get; set; }

    public string? ContactPersonEmailAddressDel { get; set; }

    public string? TurnoverLastThreeFinancialYears { get; set; }

    public string? NetProfitLastThreeFinancialYearsEnding { get; set; }

    public string? NoOfBranchDel { get; set; }

    public string? Vatnumber { get; set; }

    public string? Cstnumber { get; set; }

    public string? Tannumber { get; set; }

    public string? Pannumber { get; set; }

    public string? ServiceTaxNumber { get; set; }

    public string? ExciseRegistatNumber { get; set; }

    public string? Ssinumber { get; set; }

    public string? BankName { get; set; }

    public string? BankBranchDel { get; set; }

    public string? AccountNumber { get; set; }

    public string? AccountName { get; set; }

    public string? Ifsccode { get; set; }

    public string? Neftcode { get; set; }

    public string? Micrcode { get; set; }

    public string? Rtgsnumber { get; set; }

    public string? PaymentsTerms { get; set; }

    public string? PancopyPath { get; set; }

    public string? ExciseCopyPath { get; set; }

    public string? OtherCopyPath { get; set; }

    public string? AnyOtherRemark { get; set; }

    public bool? IsApprove { get; set; }

    public int? ApproveBy { get; set; }

    public int? KamId { get; set; }

    public bool IsCustomerCreated { get; set; }

    public int? Hodid { get; set; }

    public string? FilAproveCopy { get; set; }

    public string? KycFormCopy { get; set; }

    public int? CountryId { get; set; }

    public int? SectorId { get; set; }

    public string? BillingName { get; set; }

    public string? BillingEmail { get; set; }

    public string? BillingMobilNo { get; set; }

    public string? BillingAddres { get; set; }

    public string? Gst { get; set; }

    public string? Gstdir { get; set; }

    public bool? ChkType { get; set; }

    public int? CategoryId { get; set; }

    public string? BillingCity { get; set; }

    public string? BillingPinNo { get; set; }

    public int? FinalApproval { get; set; }

    public string? Ieccode { get; set; }

    public bool? Advance { get; set; }

    public string? Remark { get; set; }

    public string? CustomerEmailId { get; set; }

    public bool IsApproved { get; set; }

    public DateTime? DtDate { get; set; }

    public bool BDel { get; set; }
}
