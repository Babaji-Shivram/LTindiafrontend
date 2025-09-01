using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsBillDispatchDocShadow
{
    public long AuditId { get; set; }

    public int Lid { get; set; }

    public int? PreId { get; set; }

    public int? JobId { get; set; }

    public string? DocPath { get; set; }

    public string? FileName { get; set; }

    public int? DocType { get; set; }

    public int? LUser { get; set; }

    public DateTime? DtDate { get; set; }

    public int? Bdel { get; set; }

    public string AuditAction { get; set; } = null!;

    public DateTime AuditDate { get; set; }

    public string AuditUser { get; set; } = null!;

    public string? AuditApp { get; set; }
}
