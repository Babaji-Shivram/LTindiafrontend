using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class KycVendorDetail
{
    public int Lid { get; set; }

    public string? CompanyName { get; set; }

    /// <summary>
    /// 0 =&gt; Vendor, 1 =&gt; Customer, 2 =&gt; Overseas customer
    /// </summary>
    public int LType { get; set; }

    public string? Address1 { get; set; }

    public string? Address2 { get; set; }

    public string? City { get; set; }

    public int? StateId { get; set; }

    public int? CountryId { get; set; }

    public string? Pincode { get; set; }

    public string? TelephoneNo { get; set; }

    public string? FaxNo { get; set; }

    public int? ConstitutionId { get; set; }

    public int? SectorId { get; set; }

    public int? NatureofBusinessId { get; set; }

    public string? WebsiteAdd { get; set; }

    public string? Email { get; set; }

    public string? Panno { get; set; }

    public string? Vatno { get; set; }

    public string? ServiceTaxNo { get; set; }

    public string? ExciseNo { get; set; }

    public string? Cstno { get; set; }

    public string? Tanno { get; set; }

    public string? Ssino { get; set; }

    public string? BankName { get; set; }

    public string? AccountNo { get; set; }

    public string? Ifsccode { get; set; }

    public string? Micrcode { get; set; }

    public string? Ieccode { get; set; }

    public string? PaymentTerms { get; set; }

    public string? BillingName { get; set; }

    public string? BillingEmail { get; set; }

    public string? BillingPhoneNo { get; set; }

    public string? BillingAddress { get; set; }

    public string? BillingPincode { get; set; }

    public string? BillingCity { get; set; }

    public string? PancopyPath { get; set; }

    public string? IeccopyPath { get; set; }

    public string? OtherCopyPath { get; set; }

    public string? KyccopyPath { get; set; }

    public string? KycscannedCopyPath { get; set; }

    public bool IsScanned { get; set; }

    public int? IsApproved { get; set; }

    public DateOnly? ApprovedDate { get; set; }

    public string? RejectedRemark { get; set; }

    public string? IpAddress { get; set; }

    public int? LUser { get; set; }

    public DateTime DtDate { get; set; }

    public int? UpdUser { get; set; }

    public DateTime? UpdDate { get; set; }

    public bool BDel { get; set; }
}
