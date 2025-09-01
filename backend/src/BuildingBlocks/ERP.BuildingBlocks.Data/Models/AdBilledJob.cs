using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class AdBilledJob
{
    public int Lid { get; set; }

    public string? JobRefNo { get; set; }

    public int? JobId { get; set; }
}
