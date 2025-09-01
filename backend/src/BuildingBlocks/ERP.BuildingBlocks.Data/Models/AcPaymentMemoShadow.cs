using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class AcPaymentMemoShadow
{
    public long AuditId { get; set; }

    public int Lid { get; set; }

    public string PayMemoRefNo { get; set; } = null!;

    public int VendorId { get; set; }

    public decimal? MemoAmount { get; set; }

    public decimal? TotalBuyValue { get; set; }

    public int? TotalRequest { get; set; }

    public string? Remark { get; set; }

    public int? IsApproved { get; set; }

    public int? ApprovedBy { get; set; }

    public DateTime? ApprovedDate { get; set; }

    public int? MemoAuditUser { get; set; }

    public DateTime? MemoAuditDate { get; set; }

    public int? PayUserId { get; set; }

    public DateTime? PayDate { get; set; }

    public int? StatusId { get; set; }

    public int FinYearId { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public bool Bdel { get; set; }

    public int? UpdUser { get; set; }

    public DateTime? UpdDate { get; set; }

    public string AuditAction { get; set; } = null!;

    public DateTime AuditDate { get; set; }

    public string AuditUser { get; set; } = null!;

    public string? AuditApp { get; set; }
}
