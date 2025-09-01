using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class AcFaexpenseBookingRim
{
    public int Lid { get; set; }

    public int BookingId { get; set; }

    public string? ChargeName { get; set; }

    public string? ChargeCode { get; set; }

    public string? Gstin { get; set; }

    public string? InvoiceNo { get; set; }

    public DateOnly? InvoiceDate { get; set; }

    public decimal? InvoiceTaxableAmount { get; set; }

    public decimal? InvoiceTotalAmount { get; set; }

    public int? Cgst { get; set; }

    public int? Sgst { get; set; }

    public int? Igst { get; set; }

    public string? ReceiptNumber { get; set; }

    public DateOnly? ReceiptDate { get; set; }

    public string? VendorName { get; set; }

    public string? VendorCode { get; set; }

    public string? Narration { get; set; }

    public DateOnly? SubmissiontToAccountsDate { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public bool BDel { get; set; }
}
