using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class MigTemp
{
    public string? Ref { get; set; }

    public string? JobRefNo { get; set; }

    public DateTime? Odate { get; set; }

    public DateTime? Fsb { get; set; }

    public DateTime? Clrdate { get; set; }

    public double? Amount { get; set; }
}
