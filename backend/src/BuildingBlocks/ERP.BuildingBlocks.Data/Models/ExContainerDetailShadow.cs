using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class ExContainerDetailShadow
{
    public long AuditId { get; set; }

    public int Lid { get; set; }

    public int JobId { get; set; }

    public string ContainerNo { get; set; } = null!;

    public int ContainerSize { get; set; }

    public int ContainerType { get; set; }

    public string? SealNo { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public DateTime? UpdDate { get; set; }

    public int? UpdUser { get; set; }

    public bool BDel { get; set; }

    public string AuditAction { get; set; } = null!;

    public DateTime AuditDate { get; set; }

    public string AuditUser { get; set; } = null!;

    public string? AuditApp { get; set; }
}
