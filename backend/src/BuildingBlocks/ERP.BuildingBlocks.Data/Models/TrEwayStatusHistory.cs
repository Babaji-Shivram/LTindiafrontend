using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class TrEwayStatusHistory
{
    public long Lid { get; set; }

    public int? EwayId { get; set; }

    /// <summary>
    /// 0 - Not Valid For Movement, 1 Active, 2 Cancel, 3 Reject
    /// </summary>
    public int? LStatus { get; set; }

    public string? StatusDate { get; set; }

    public string? StatusReason { get; set; }

    public string? StatusRemark { get; set; }

    public bool? IsActive { get; set; }

    public int? LUser { get; set; }

    public DateTime DtDate { get; set; }
}
