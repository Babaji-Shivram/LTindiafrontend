using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsTimestampShadow
{
    public long AuditId { get; set; }

    public int LId { get; set; }

    public int ModuleId { get; set; }

    public string Timestamp { get; set; } = null!;

    public DateTime DtDate { get; set; }

    public bool BDel { get; set; }

    public string AuditAction { get; set; } = null!;

    public DateTime AuditDate { get; set; }

    public string AuditUser { get; set; } = null!;

    public string? AuditApp { get; set; }
}
