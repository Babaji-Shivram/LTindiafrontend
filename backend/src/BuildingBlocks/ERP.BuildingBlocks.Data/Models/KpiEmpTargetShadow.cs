using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class KpiEmpTargetShadow
{
    public long AuditId { get; set; }

    public long Lid { get; set; }

    public int EmpId { get; set; }

    public string? EmpName { get; set; }

    public string? EmpEmail { get; set; }

    public string? EmpCode { get; set; }

    public int Hodid { get; set; }

    public bool IsApprove { get; set; }

    public int? ReviewBy { get; set; }

    public DateTime? ReviewDate { get; set; }

    public string EmpRemark { get; set; } = null!;

    public string? ApproveRemark { get; set; }

    public int FinYear { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public int? UpdUser { get; set; }

    public DateTime? UpdDate { get; set; }

    public bool BDel { get; set; }

    public string AuditAction { get; set; } = null!;

    public DateTime AuditDate { get; set; }

    public string AuditUser { get; set; } = null!;

    public string? AuditApp { get; set; }
}
