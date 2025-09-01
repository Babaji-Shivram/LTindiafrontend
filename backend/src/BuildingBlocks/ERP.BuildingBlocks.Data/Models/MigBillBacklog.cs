using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class MigBillBacklog
{
    public double? Sl { get; set; }

    public string? BsJobNo { get; set; }

    public string? Customer { get; set; }

    public string? Stage { get; set; }

    public string? DraftedBy { get; set; }

    public DateTime? DraftedOn { get; set; }

    public string? FinalTypedBy { get; set; }

    public DateTime? FinalTypedOn { get; set; }

    public string? RimBillNo { get; set; }

    public string? AgBillNo { get; set; }

    public DateTime? FinalBillDate { get; set; }

    public double? RimBillAmt { get; set; }

    public double? AgBillAmt { get; set; }

    public DateTime? DispatchDate { get; set; }
}
