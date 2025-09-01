using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BjvDraftFinalDetailsShadow
{
    public long AuditId { get; set; }

    public long Lid { get; set; }

    public long? JobId { get; set; }

    public string? Bjvno { get; set; }

    public string? Draftby { get; set; }

    public DateTime? Draftdate { get; set; }

    public string? Drfcompby { get; set; }

    public DateTime? Drfcompdate { get; set; }

    public string? Flby { get; set; }

    public DateTime? Fldate { get; set; }

    public DateTime? Invdate { get; set; }

    public string? Invno { get; set; }

    public int? Invamount { get; set; }

    public int? IsBillReturn { get; set; }

    public bool? IsBill { get; set; }

    public int? DispatchStatus { get; set; }

    public int? EbillStatus { get; set; }

    public int? PortalStatus { get; set; }

    public DateTime? EbillDate { get; set; }

    public DateTime? ClientPortalDate { get; set; }

    public string? ClientPortalRefNo { get; set; }

    public int? BillStatus { get; set; }

    public int? LStatus { get; set; }

    public DateTime? DtDate { get; set; }

    public DateTime? UpdDate { get; set; }

    public int? Bdel { get; set; }

    public string AuditAction { get; set; } = null!;

    public DateTime AuditDate { get; set; }

    public string AuditUser { get; set; } = null!;

    public string? AuditApp { get; set; }
}
