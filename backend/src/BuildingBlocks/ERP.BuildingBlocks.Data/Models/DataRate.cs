using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class DataRate
{
    public int Lid { get; set; }

    public int? ItemId { get; set; }

    public decimal? Rate { get; set; }
}
