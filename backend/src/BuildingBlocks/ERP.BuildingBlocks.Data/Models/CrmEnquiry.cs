using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class CrmEnquiry
{
    public int Lid { get; set; }

    public string? EnquiryNo { get; set; }

    public int? LeadId { get; set; }

    public int? OpportunityId { get; set; }

    public string Notes { get; set; } = null!;

    public int? ApprovalTo { get; set; }

    public int? QuotationId { get; set; }

    public bool? IsApproved { get; set; }

    public DateTime? ApprovedDate { get; set; }

    public int? ApprovedBy { get; set; }

    public int? VendorId { get; set; }

    public bool IsOutsideEnq { get; set; }

    public int? EnqCustomerId { get; set; }

    public string? PaymentTerms { get; set; }

    public string? CustRef { get; set; }

    public string? Turnover { get; set; }

    public string? YearsInService { get; set; }

    public string? TotalEmp { get; set; }

    /// <summary>
    /// 1. Corporate, 2. Partnership , 3. LLP
    /// </summary>
    public int? CompanyType { get; set; }

    public string? VolumeExpected { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public int? UpdUser { get; set; }

    public DateTime? UpdDate { get; set; }

    public bool BDel { get; set; }
}
