using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class FrRateAir
{
    public int Lid { get; set; }

    public string? Month { get; set; }

    public string? Country { get; set; }

    public string? Pol { get; set; }

    public string? Pod { get; set; }

    public decimal? Minrate { get; set; }

    public decimal? _45Kg { get; set; }

    public decimal? _100Kg { get; set; }

    public decimal? _300Kg { get; set; }

    public decimal? _500Kg { get; set; }

    public decimal? _1000Kg { get; set; }

    public decimal? Adhoc { get; set; }

    public string? Airline { get; set; }

    public string? Agent { get; set; }

    public DateTime? Validity { get; set; }

    public bool? BDel { get; set; }
}
