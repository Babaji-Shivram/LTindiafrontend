using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsBlcopyDetail
{
    public int LId { get; set; }

    public int? JobId { get; set; }

    public string? Mblno { get; set; }

    public DateOnly? Mbldate { get; set; }

    public string? Hblno { get; set; }

    public DateOnly? Hbldate { get; set; }

    public string? ContainerNo { get; set; }

    public string? ContainerSize { get; set; }

    public string? ContainerType { get; set; }

    public DateTime? DtDate { get; set; }

    public DateTime? UpdDate { get; set; }

    public int? LUser { get; set; }

    public bool BDel { get; set; }

    public string? MatchIcegate { get; set; }

    public string? MatchLiveTracking { get; set; }
}
