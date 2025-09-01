using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class TrEwayTypeM
{
    public int Lid { get; set; }

    public string SName { get; set; } = null!;

    public int SValue { get; set; }

    /// <summary>
    /// 1 For Inward 2 for Outward
    /// </summary>
    public int TransactionTypeId { get; set; }
}
