using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class MigApitransaction20241217
{
    public double? Sl { get; set; }

    public string? ReferenceNo { get; set; }

    public string? UtrNo22Char { get; set; }

    public DateTime? UtrDate { get; set; }

    public double? PaidAmount { get; set; }

    public string? UtrNo16Char { get; set; }
}
