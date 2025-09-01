using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BjvJobStatus
{
    public int Lid { get; set; }

    public int JobId { get; set; }

    public int ModuleId { get; set; }

    public string FarefNo { get; set; } = null!;

    public bool? IsOpen { get; set; }

    public bool? IsClose { get; set; }

    public bool? IsBilled { get; set; }

    public bool? IsAudit { get; set; }

    public string? AuditRemark { get; set; }

    public bool BDel { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public DateTime? UpdDate { get; set; }
}
