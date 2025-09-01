using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class MigBillingHandDelivery
{
    public double? Sl { get; set; }

    public string? CoveringLetterNo { get; set; }

    public string? CustomerName { get; set; }

    public string? FileName { get; set; }

    public string? BillingUserName { get; set; }

    public string? CourierName { get; set; }

    public string? PodNo { get; set; }

    public DateTime? DispatchDate { get; set; }
}
