using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class TempExpenseDpd
{
    public double? Srno { get; set; }

    public string? Jobno { get; set; }

    public int? JobId { get; set; }

    public string? Consigne { get; set; }

    public int? JobType { get; set; }

    public long? BalancAmount { get; set; }

    public int? BalanceLive { get; set; }

    public string? Cont20 { get; set; }

    public string? Cont40 { get; set; }

    public int? TotalContainer { get; set; }

    public int? TotalAmount { get; set; }

    public long? SentAmt { get; set; }

    public bool? Delivered { get; set; }
}
