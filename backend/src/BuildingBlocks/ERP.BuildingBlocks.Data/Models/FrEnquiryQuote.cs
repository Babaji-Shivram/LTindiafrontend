using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class FrEnquiryQuote
{
    public long Lid { get; set; }

    public int EnqId { get; set; }

    public int HeadingId { get; set; }

    public int Uomid { get; set; }

    public int CurrencyId { get; set; }

    public string? ExchangeRate { get; set; }

    public string? Rate { get; set; }

    public string? Amount { get; set; }

    public string AmtInr { get; set; } = null!;

    public string? Quantity { get; set; }

    public string? ContainerType { get; set; }

    public int? ContainerSize { get; set; }

    public int? Operation { get; set; }

    public int? AtActual { get; set; }

    public bool? IsCan { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public int? UpdUser { get; set; }

    public DateTime? UpdDate { get; set; }

    public bool BDel { get; set; }
}
