using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class MigPayDec
{
    public double? Sl { get; set; }

    public int? InvoiceId { get; set; }

    public int? PaymentId { get; set; }

    public string? JobNo { get; set; }

    public bool? IsFlag { get; set; }

    public string? InvoiceNo { get; set; }

    public DateTime? InvoiceDate { get; set; }

    public string? NetPayable { get; set; }

    public double? NetPayable1 { get; set; }

    public string? Transporter { get; set; }

    public double? TotalValue { get; set; }

    public double? Tds { get; set; }

    public double? AdvAmt { get; set; }

    public string? Remark { get; set; }

    public DateTime? BatchDate { get; set; }
}
