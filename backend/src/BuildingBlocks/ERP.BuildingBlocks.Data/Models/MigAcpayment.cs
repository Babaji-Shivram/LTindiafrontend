using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class MigAcpayment
{
    public int? Sl { get; set; }

    public string? JobNo { get; set; }

    public string? Type { get; set; }

    public string? InvoiceNo { get; set; }

    public string? Jbno { get; set; }

    public string? InvoiceType { get; set; }

    public string? Status { get; set; }

    public string? Customer { get; set; }

    public string? Consignee { get; set; }

    public string? VendorName { get; set; }

    public double? VendorPaymentTermsInDays { get; set; }

    public DateTime? PaymentRequiredDate { get; set; }

    public double? TotalValue { get; set; }

    public double? Advance { get; set; }

    public string? Remark { get; set; }

    public string? M1number { get; set; }

    public DateTime? Utrdate { get; set; }

    public string? Utrno { get; set; }

    public string? Comments { get; set; }

    public string? Remarks { get; set; }

    public string? Responsibility { get; set; }

    public string? Type1 { get; set; }

    public bool? IsUpdate { get; set; }
}
