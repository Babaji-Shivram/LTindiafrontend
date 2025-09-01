using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class MigEway
{
    public int Lid { get; set; }

    public int? JobId { get; set; }

    public string? JobRefNo { get; set; }

    public double? Sno { get; set; }

    public string? InvoiceNo { get; set; }

    public string? InvoiceDate { get; set; }

    public string? InvoiceValue { get; set; }

    public string? TermsOfInvoice { get; set; }

    public string? ItemQuantity { get; set; }

    public string? ItemUom { get; set; }

    public string? ItemPrice { get; set; }

    public string? ProductDescription { get; set; }

    public string? InvoiceCurrencyCode { get; set; }

    public string? ItemCetNo { get; set; }

    public string? ItemAssessableValue { get; set; }

    public double? ItemBcdRate { get; set; }

    public double? ItemBcdAmount { get; set; }

    public double? ItemSocialWelfareRate { get; set; }

    public double? ItemSocialWelfareAmt { get; set; }

    public double? IgstLevyRate { get; set; }

    public string? IgstLevyTotalAmt { get; set; }

    public DateTime? DtDate { get; set; }

    public bool? Bdel { get; set; }
}
