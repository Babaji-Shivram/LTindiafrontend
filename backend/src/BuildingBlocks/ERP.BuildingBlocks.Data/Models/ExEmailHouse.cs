using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class ExEmailHouse
{
    public int Lid { get; set; }

    public string? EmailTo { get; set; }

    public string? EmailBody { get; set; }
}
