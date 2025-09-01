using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class FrRateSea
{
    public int? Lid { get; set; }

    public string? Month { get; set; }

    public string? Country { get; set; }

    public string? Pol { get; set; }

    public string? Pod { get; set; }

    public string? Line { get; set; }

    public double? TT { get; set; }

    public string? _20gp { get; set; }

    public string? _40gpHq { get; set; }

    public string? Specials { get; set; }

    public string? Weight20ft { get; set; }

    public string? Weight40ft { get; set; }

    public string? Agent { get; set; }

    public string? Validity { get; set; }
}
