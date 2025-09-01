using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class FopInvoiceDetailShadow
{
    public long AuditId { get; set; }

    public long LId { get; set; }

    public long EnqId { get; set; }

    public int InvoiceItemId { get; set; }

    public int? Uomid { get; set; }

    public decimal Rate { get; set; }

    public int CurrencyId { get; set; }

    public decimal? ExchangeRate { get; set; }

    public decimal? MinUnit { get; set; }

    public decimal? MinAmount { get; set; }

    public bool TaxApplicable { get; set; }

    public decimal? TaxPercentage { get; set; }

    public decimal? TaxAmount { get; set; }

    public decimal? Amount { get; set; }

    public decimal? CgstTax { get; set; }

    public decimal? CgstTaxAmt { get; set; }

    public decimal? SgstTax { get; set; }

    public decimal? SgstTaxAmt { get; set; }

    public decimal? IgstTax { get; set; }

    public decimal? IgstTaxAmt { get; set; }

    public decimal? TotalAmount { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public bool BDel { get; set; }

    public string AuditAction { get; set; } = null!;

    public DateTime AuditDate { get; set; }

    public string AuditUser { get; set; } = null!;

    public string? AuditApp { get; set; }
}
