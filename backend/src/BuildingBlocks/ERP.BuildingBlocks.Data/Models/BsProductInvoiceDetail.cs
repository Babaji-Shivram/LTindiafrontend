using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsProductInvoiceDetail
{
    public long LId { get; set; }

    public int? SrNo { get; set; }

    public long JobId { get; set; }

    public string InvoiceNo { get; set; } = null!;

    public string? Currency { get; set; }

    public string? TermsOfInvoice { get; set; }

    public DateOnly? InvoiceDate { get; set; }

    public string? InvoiceValue { get; set; }

    public decimal? InvoiceQuantity { get; set; }

    public string? ExchangeRate { get; set; }

    public DateTime? ExchangeRateDate { get; set; }

    public string? InvoiceFreightCurrency { get; set; }

    public decimal? InvoiceFreightExRate { get; set; }

    public decimal? InvoiceFreightAmount { get; set; }

    public string? InvoiceMiscCurrency { get; set; }

    public decimal? InvoiceMiscExRate { get; set; }

    public decimal? InvoiceMiscRate { get; set; }

    public decimal? InvoiceMiscAmount { get; set; }

    public string? InvoiceAgencyCurrency { get; set; }

    public decimal? InvoiceAgencyExRate { get; set; }

    public decimal? InvoiceAgencyAmount { get; set; }

    public string? InvoiceDiscountCurrency { get; set; }

    public decimal? InvoiceDiscountExRate { get; set; }

    public decimal? InvoiceDiscountAmount { get; set; }

    public string? InvoiceLoadingCurrency { get; set; }

    public decimal? InvoiceLoadingExRate { get; set; }

    public decimal? InvoiceLoadingAmount { get; set; }

    public string? InvoiceInsuranceCurrency { get; set; }

    public decimal? InvoiceInsuranceExRate { get; set; }

    public decimal? InvoiceInsuranceRate { get; set; }

    public decimal? InvoiceInsuranceAmount { get; set; }

    public string? InvoiceHssCurrency { get; set; }

    public decimal? InvoiceHssExRate { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public bool BDel { get; set; }

    public virtual ICollection<BsTruncatePreventKey> BsTruncatePreventKeys { get; set; } = new List<BsTruncatePreventKey>();
}
