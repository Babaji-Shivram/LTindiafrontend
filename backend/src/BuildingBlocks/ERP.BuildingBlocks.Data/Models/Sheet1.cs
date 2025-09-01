using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class Sheet1
{
    public int Lid { get; set; }

    public int? JobId { get; set; }

    public string? JobNo { get; set; }

    public string? Customer { get; set; }

    public string? BillingStage { get; set; }

    public string? CreatedBy { get; set; }

    public DateTime? JobDate { get; set; }

    public double? Ageing { get; set; }
}
