using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class MigBillingCourier
{
    public int Sl { get; set; }

    public int? CoverId { get; set; }

    public string? CoveringLetterNo { get; set; }

    public string? CustomerName { get; set; }

    public string? FileName { get; set; }

    public string? BillingUserName { get; set; }

    public string? CourierName { get; set; }

    public double? Podno { get; set; }

    public DateTime? DispatchDate { get; set; }

    public bool? IsUpdate { get; set; }
}
