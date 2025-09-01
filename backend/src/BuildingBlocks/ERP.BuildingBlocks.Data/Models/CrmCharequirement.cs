using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class CrmCharequirement
{
    public int Lid { get; set; }

    public int? OpportunityId { get; set; }

    public int? LeadServiceId { get; set; }

    /// <summary>
    /// 1 - Air, 2- Sea
    /// </summary>
    public int ModeId { get; set; }

    public int ContainerTypeId { get; set; }

    public string? Commodity { get; set; }

    public string? PortName { get; set; }

    /// <summary>
    /// 0 - No, 1 - Yes
    /// </summary>
    public bool? Dpd { get; set; }

    public string? Notes { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public int? UpdUser { get; set; }

    public DateTime? UpdDate { get; set; }

    public bool BDel { get; set; }
}
