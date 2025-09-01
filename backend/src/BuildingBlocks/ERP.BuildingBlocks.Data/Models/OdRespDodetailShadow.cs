using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class OdRespDodetailShadow
{
    public long AuditId { get; set; }

    public int Lid { get; set; }

    public int? JobId { get; set; }

    public int ModuleId { get; set; }

    public string? BnfCode { get; set; }

    public string? DoReqStatus { get; set; }

    public string? BlNo { get; set; }

    public string? LocationCode { get; set; }

    public string? Remarks { get; set; }

    public string? Status { get; set; }

    public DateTime DtDate { get; set; }

    public bool Bdel { get; set; }

    public string AuditAction { get; set; } = null!;

    public DateTime AuditDate { get; set; }

    public string AuditUser { get; set; } = null!;

    public string? AuditApp { get; set; }
}
