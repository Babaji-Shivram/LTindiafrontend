using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class FrQuoteBuyDetail
{
    public int Lid { get; set; }

    public int? EnqId { get; set; }

    public int? Sellid { get; set; }

    public int? AtActual { get; set; }

    public int? HeadingId { get; set; }

    public int? Uomid { get; set; }

    public string? ExchangeRate { get; set; }

    public int? CurrencyId { get; set; }

    public string? Quantity { get; set; }

    public string? Rate { get; set; }

    public string? BuyAmount { get; set; }

    public bool? IsSelf { get; set; }

    public string? VendorName { get; set; }

    public int? LUser { get; set; }

    public DateTime? DtDate { get; set; }

    public int? UpdUser { get; set; }

    public DateTime? UpdDate { get; set; }

    public bool? BDel { get; set; }
}
