using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class AppStatus
{
    public double Version { get; set; }

    public bool Status { get; set; }

    public string? Skey { get; set; }
}
