using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class PassingDatum
{
    public int Lid { get; set; }

    public int? InvoiceItemId { get; set; }

    public string? InvoiceIitemName { get; set; }

    public int? AirSacId { get; set; }

    public decimal? AirSacCode { get; set; }

    public int? SeaSacId { get; set; }

    public decimal? SeaSacCode { get; set; }

    public decimal? Rate { get; set; }
}
