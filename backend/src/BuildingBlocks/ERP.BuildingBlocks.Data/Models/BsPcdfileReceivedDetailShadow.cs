using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsPcdfileReceivedDetailShadow
{
    public long AuditId { get; set; }

    public long Lid { get; set; }

    public int? JobId { get; set; }

    public int? ReceivedTypeId { get; set; }

    public int? SentUser { get; set; }

    public DateTime? SentDate { get; set; }

    public DateTime? ReceivedDate { get; set; }

    public int? ReceivedBy { get; set; }

    public DateTime? CompletedDate { get; set; }

    public int? CompletedBy { get; set; }

    public bool? Isactive { get; set; }

    public int? LUser { get; set; }

    public DateTime? DtDate { get; set; }

    public int? BDel { get; set; }

    public int? Consolidatedjob { get; set; }

    public string? FreightjobNo { get; set; }

    public string? Onlinebill { get; set; }

    public string? CrossRemark { get; set; }

    public string AuditAction { get; set; } = null!;

    public DateTime AuditDate { get; set; }

    public string AuditUser { get; set; } = null!;

    public string? AuditApp { get; set; }
}
