using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class CrmLeadEnquiry
{
    public int Lid { get; set; }

    public string? EnquiryNo { get; set; }

    public int LeadId { get; set; }

    public int? ServiceId { get; set; }

    public string Notes { get; set; } = null!;

    public int? ApprovalTo { get; set; }

    public int? QuotationId { get; set; }

    public bool? IsApproved { get; set; }

    public int? VendorId { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public int? UpdUser { get; set; }

    public DateTime? UpdDate { get; set; }

    public bool BDel { get; set; }
}
