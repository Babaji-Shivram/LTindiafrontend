using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class TrMaintenanceExpenseShadow
{
    public long AuditId { get; set; }

    public long Lid { get; set; }

    public long MaintainId { get; set; }

    public int? VehicleId { get; set; }

    public decimal? Amount { get; set; }

    public decimal? ApprovedAmount { get; set; }

    public string? BillNumber { get; set; }

    public string? PaidTo { get; set; }

    public string? SupportBillPaidTo { get; set; }

    public DateTime? PaidDate { get; set; }

    public int PayTypeId { get; set; }

    public string? ExpenseDesc { get; set; }

    public int? CategoryId { get; set; }

    public bool IsApproved { get; set; }

    public int? ApprovedBy { get; set; }

    public DateTime? ApproveDate { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public bool BDel { get; set; }

    public int? UpdUser { get; set; }

    public DateTime? UpdDate { get; set; }

    public string AuditAction { get; set; } = null!;

    public DateTime AuditDate { get; set; }

    public string AuditUser { get; set; } = null!;

    public string? AuditApp { get; set; }
}
