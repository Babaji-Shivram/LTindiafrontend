using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsCurrencyM
{
    public int LId { get; set; }

    public int? CountryId { get; set; }

    public string CountryName { get; set; } = null!;

    public string Currency { get; set; } = null!;

    public string? CurrencyCode { get; set; }

    public bool BDel { get; set; }

    public DateTime DtDate { get; set; }
}
