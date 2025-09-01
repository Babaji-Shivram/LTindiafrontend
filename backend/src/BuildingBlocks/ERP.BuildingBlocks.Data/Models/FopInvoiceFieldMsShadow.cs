using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class FopInvoiceFieldMsShadow
{
    public long AuditId { get; set; }

    public int Lid { get; set; }

    public string? FieldName { get; set; }

    public string? ReportHeader { get; set; }

    public int UnitMeasurId { get; set; }

    public string? Saccode { get; set; }

    public int? SacId { get; set; }

    public int? AirSacId { get; set; }

    public int? SeaSacId { get; set; }

    public decimal? TaxRateOld { get; set; }

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

    public string AuditAction { get; set; } = null!;

    public DateTime AuditDate { get; set; }

    public string AuditUser { get; set; } = null!;

    public string? AuditApp { get; set; }
}
