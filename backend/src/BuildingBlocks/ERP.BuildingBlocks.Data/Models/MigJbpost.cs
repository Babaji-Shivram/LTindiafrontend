using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class MigJbpost
{
    public int? Sl { get; set; }

    public string? JobNo { get; set; }

    public string? InvoiceNo { get; set; }

    public string? Status { get; set; }

    public DateTime? InvoiceDate { get; set; }

    public string? VendorName { get; set; }

    public double? InvoiceValue { get; set; }

    public double? Tds { get; set; }

    public double? NetPaid { get; set; }

    public string? JbNo { get; set; }

    public string? M1Number { get; set; }

    public DateTime? PaidDate { get; set; }

    public double? ChequeNo { get; set; }

    public bool? IsUpdate { get; set; }
}
