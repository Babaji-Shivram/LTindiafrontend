using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class CrmFollowupHistory
{
    public int Lid { get; set; }

    public int? LeadId { get; set; }

    public DateTime? Date { get; set; }

    public string? Remark { get; set; }

    /// <summary>
    /// 1 =&gt; Completed, 0 =&gt; Cancelled, null =&gt; Pending
    /// </summary>
    public int? IsCompleted { get; set; }

    public bool IsActive { get; set; }

    public bool IsMobile { get; set; }

    public int? LUser { get; set; }

    public DateTime? DtDate { get; set; }

    public int? UpdUser { get; set; }

    public DateTime? UpdDate { get; set; }

    public bool? BDel { get; set; }
}
