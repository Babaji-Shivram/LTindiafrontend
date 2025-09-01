using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class FopAgentPreAlertShadow
{
    public long AuditId { get; set; }

    public int LId { get; set; }

    public int EnqId { get; set; }

    public string? Mblno { get; set; }

    public DateTime? Mbldate { get; set; }

    public string? Hblno { get; set; }

    public DateTime? Hbldate { get; set; }

    public string? VesselName { get; set; }

    public string? VesselNumber { get; set; }

    public DateTime? Etd { get; set; }

    public DateTime? Eta { get; set; }

    public string? FinalAgent { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public int? UpdUser { get; set; }

    public DateTime? UpdDate { get; set; }

    public bool? BDel { get; set; }

    public string AuditAction { get; set; } = null!;

    public DateTime AuditDate { get; set; }

    public string AuditUser { get; set; } = null!;

    public string? AuditApp { get; set; }
}
