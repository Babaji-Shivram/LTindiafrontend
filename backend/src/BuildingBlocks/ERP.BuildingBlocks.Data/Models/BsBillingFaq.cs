using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsBillingFaq
{
    public long Lid { get; set; }

    public int? Department { get; set; }

    public string? Faq { get; set; }

    public int? LUser { get; set; }

    public DateTime? DtDate { get; set; }

    public bool? Isactive { get; set; }

    public string? Query { get; set; }
}
