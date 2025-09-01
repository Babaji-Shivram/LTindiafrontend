using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class TrEwayProductM
{
    public long Lid { get; set; }

    public int? CustomerId { get; set; }

    public string? SName { get; set; }

    public string? SCode { get; set; }

    public string? SDescription { get; set; }

    public long? Hsncode { get; set; }

    public decimal? Igstrate { get; set; }

    public decimal? Cgstrate { get; set; }

    public decimal? Sgstrate { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public bool BDel { get; set; }
}
