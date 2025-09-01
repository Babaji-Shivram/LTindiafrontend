using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class FopInvoiceFieldM
{
    public int Lid { get; set; }

    public string? FieldName { get; set; }

    public string? ReportHeader { get; set; }

    public int UnitMeasurId { get; set; }

    public string? Saccode { get; set; }

    public int? SacId { get; set; }

    public int? AirSacId { get; set; }

    public int? SeaSacId { get; set; }

    /// <summary>
    /// GST Tax Rate
    /// </summary>
    public decimal? TaxRateOld { get; set; }

    /// <summary>
    /// GST Tax Rate
    /// </summary>
    public decimal? TaxRate { get; set; }

    public int? PercentOfFieldIdDeleted { get; set; }

    public bool IsTaxable { get; set; }

    public string? Remark { get; set; }

    public int? LOrder { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public bool BDel { get; set; }

    public int? UpdUser { get; set; }

    public DateTime? UpdDate { get; set; }
}
