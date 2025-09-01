using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsProductInvoiceDetailDeleted
{
    public long LId { get; set; }

    public int JobId { get; set; }

    public string InvoiceNo { get; set; } = null!;

    public DateTime InvoiceDate { get; set; }

    public string TermsOfInvoice { get; set; } = null!;

    public string ProductDescription { get; set; } = null!;

    public decimal? Quantity { get; set; }

    public decimal? BalanceQuantity { get; set; }

    public string? UnitOfProduct { get; set; }

    public decimal? UnitPrice { get; set; }

    public decimal? ProductAmount { get; set; }

    public string? InvoiceCurrency { get; set; }

    public int LInvoiceDate { get; set; }

    public bool BDel { get; set; }

    public int? LUser { get; set; }

    public DateTime? DtDate { get; set; }
}
