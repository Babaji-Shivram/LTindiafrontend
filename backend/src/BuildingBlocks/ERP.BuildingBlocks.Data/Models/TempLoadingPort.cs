using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class TempLoadingPort
{
    public long? No { get; set; }

    public string? PortFullName { get; set; }

    public string? Nation { get; set; }

    public string? PortCode { get; set; }
}
