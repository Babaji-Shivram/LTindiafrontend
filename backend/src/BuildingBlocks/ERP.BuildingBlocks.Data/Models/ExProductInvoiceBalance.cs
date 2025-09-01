using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class ExProductInvoiceBalance
{
    public long LId { get; set; }

    public long InvoiceId { get; set; }

    public long JobId { get; set; }

    public int? ItemSrNo { get; set; }

    public int? Slno { get; set; }

    public int? SchemeCode { get; set; }

    public int? Ritccode { get; set; }

    public string? Description { get; set; }

    public string? Quantity { get; set; }

    public string? QuantityUnit { get; set; }

    public string? UnitPrice { get; set; }

    public decimal? AmountInr { get; set; }

    public string? ApplicableExpSchemes { get; set; }

    public decimal? Fobvalue { get; set; }

    public decimal? Pmvvalue { get; set; }

    public string? Sqcunit { get; set; }

    public decimal? Sqcqty { get; set; }

    public string? CountryDestination { get; set; }

    public string? Ftacode { get; set; }

    public decimal? TaxableValue { get; set; }

    public decimal? IgstAmount { get; set; }

    public string? DbkSchNo { get; set; }

    public string? Dbkdescription { get; set; }

    public decimal? ExciseDbkrate { get; set; }

    public decimal? Dbkqty { get; set; }

    public string? Dbkunit { get; set; }

    public decimal? DrawbackAmt { get; set; }

    public string? Rodtep { get; set; }

    public decimal? RoDtepqty { get; set; }

    public string? RoDtepuqc { get; set; }

    public decimal? RoDtepamount { get; set; }

    public decimal? Roslrate { get; set; }

    public decimal? RoslcapValue { get; set; }

    public decimal? Roslamount { get; set; }

    public decimal? RoslcentralRate { get; set; }

    public decimal? RoslcentralCapValue { get; set; }

    public decimal? RoslcentralAmount { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public int? UpdUser { get; set; }

    public DateTime? UpdDate { get; set; }

    public bool BDel { get; set; }
}
