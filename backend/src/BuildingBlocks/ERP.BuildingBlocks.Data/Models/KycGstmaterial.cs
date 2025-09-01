using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class KycGstmaterial
{
    public int Lid { get; set; }

    public int? CustomerId { get; set; }

    public string? MaterialSupplied { get; set; }

    public string? CommodityName { get; set; }

    public string? Hsncode { get; set; }

    public int? MaterialType { get; set; }

    public int? Iuser { get; set; }

    public bool? BDel { get; set; }

    public DateTime? DtDate { get; set; }
}
