using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsPcdfileReceivedDetail
{
    public long Lid { get; set; }

    public int? JobId { get; set; }

    /// <summary>
    /// 1 - Billing Scrutiny (2-Draft Invoice,3-Draft Check,4-Final Type,5-Final Check), 6 -Bill Dispatch
    /// </summary>
    public int? ReceivedTypeId { get; set; }

    public int? SentUser { get; set; }

    /// <summary>
    /// File Sent Date To Billing Scrutiny.
    /// </summary>
    public DateTime? SentDate { get; set; }

    /// <summary>
    /// File Received Date by Billing Scrutiny.
    /// </summary>
    public DateTime? ReceivedDate { get; set; }

    public int? ReceivedBy { get; set; }

    public DateTime? CompletedDate { get; set; }

    public int? CompletedBy { get; set; }

    /// <summary>
    /// 0 – Inactive, 1-active
    /// </summary>
    public bool? Isactive { get; set; }

    public int? LUser { get; set; }

    public DateTime? DtDate { get; set; }

    public int? BDel { get; set; }

    public int? Consolidatedjob { get; set; }

    public string? FreightjobNo { get; set; }

    public string? Onlinebill { get; set; }

    public string? CrossRemark { get; set; }

    public int? ModuleId { get; set; }

    public bool? IsReject { get; set; }
}
