using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class CrmFreightRequirement
{
    public int Lid { get; set; }

    public int? OpportunityId { get; set; }

    public int? LeadServiceId { get; set; }

    /// <summary>
    /// 0 - Import, 1 - Export
    /// </summary>
    public bool TypeId { get; set; }

    /// <summary>
    /// 1- Air, 2- Sea
    /// </summary>
    public int ModeId { get; set; }

    public string? Commodity { get; set; }

    public int? ContainerTypeId { get; set; }

    public string? Notes { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public int? UpdUser { get; set; }

    public DateTime? UpdDate { get; set; }

    public bool BDel { get; set; }
}
