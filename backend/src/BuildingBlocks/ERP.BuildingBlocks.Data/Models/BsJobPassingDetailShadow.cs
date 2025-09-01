using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsJobPassingDetailShadow
{
    public long AuditId { get; set; }

    public int LId { get; set; }

    public int JobId { get; set; }

    public DateTime? AppraisingDate { get; set; }

    public DateTime? AssessmentDate { get; set; }

    public DateTime? QueryDate { get; set; }

    public int? StageId { get; set; }

    public bool? BondStatus { get; set; }

    public string? Remark { get; set; }

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
