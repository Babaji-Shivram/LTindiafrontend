using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class KycSo
{
    public int Lid { get; set; }

    public int? CustomerId { get; set; }

    public string? Particular { get; set; }

    public string? Details { get; set; }

    public int? Luser { get; set; }

    public int? BDel { get; set; }

    public DateTime? Dtdate { get; set; }
}
