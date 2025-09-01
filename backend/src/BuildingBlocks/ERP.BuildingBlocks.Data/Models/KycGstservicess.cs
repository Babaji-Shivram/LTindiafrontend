using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class KycGstservicess
{
    public int Lid { get; set; }

    public int? CustomerId { get; set; }

    public string? ServiceProvided { get; set; }

    public string? ServiceCategory { get; set; }

    public string? Saccode { get; set; }

    public int? ServiceType { get; set; }

    public int? LUser { get; set; }

    public bool? BDel { get; set; }

    public DateTime? DtDate { get; set; }
}
