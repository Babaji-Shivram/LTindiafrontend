using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class FrSeaRateChart
{
    public int Lid { get; set; }

    public string? Country { get; set; }

    public string? Pol { get; set; }

    public string? Pod { get; set; }

    public string? Line { get; set; }

    public string? TransitDays { get; set; }

    public string? _20gp { get; set; }

    public string? _40gphq { get; set; }

    public string? Currency { get; set; }

    public string? Remark { get; set; }

    public string? Agent { get; set; }

    public DateTime? RateValidityDate { get; set; }

    public int? LUser { get; set; }

    public DateTime DtDate { get; set; }

    public bool BDel { get; set; }

    public int? UpdUser { get; set; }

    public DateTime? UpdDate { get; set; }
}
