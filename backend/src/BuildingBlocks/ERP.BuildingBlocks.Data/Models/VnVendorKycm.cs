using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class VnVendorKycm
{
    public int LId { get; set; }

    public string? VendorName { get; set; }

    /// <summary>
    /// 1 - Vendor, 2 Customer
    /// </summary>
    public int KycTypeId { get; set; }

    public string? ContactPerson { get; set; }

    public string? ContactNo { get; set; }

    public string? LegalName { get; set; }

    public string? TradeName { get; set; }

    public string? Address { get; set; }

    public string? OfficeTelephone { get; set; }

    public string? Email { get; set; }

    public string? Gstn { get; set; }

    public int? GstregTypeId { get; set; }

    public string? Location { get; set; }

    public string? Division { get; set; }

    public int? CreditDays { get; set; }

    public bool? IsMsme { get; set; }

    public bool? IsTds { get; set; }

    public string? Hodname { get; set; }

    public string? Ccmname { get; set; }

    public string? Kamname { get; set; }

    public int? VendorCategoryId { get; set; }

    public string? PanNo { get; set; }

    public string? Country { get; set; }

    public string? State { get; set; }

    public string? City { get; set; }

    public string? Pincode { get; set; }

    public string? FileDirName { get; set; }

    public string? Remark { get; set; }

    public int StatusId { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public DateTime? UpdDate { get; set; }

    public int? UdpUser { get; set; }

    public bool BDel { get; set; }

    public string? CompanyCode { get; set; }

    public bool IsCustomerCreated { get; set; }
}
