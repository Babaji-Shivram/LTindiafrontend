using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class TestMigDispatchPending
{
    public double? Sl { get; set; }

    public string? JobRefNo { get; set; }

    public string? Branch { get; set; }

    public string? Customer { get; set; }

    public string? EbillDate { get; set; }
}
