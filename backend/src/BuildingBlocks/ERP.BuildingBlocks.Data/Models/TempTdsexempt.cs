using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class TempTdsexempt
{
    public int Lid { get; set; }

    public double? Sl { get; set; }

    public string? JobNo { get; set; }

    public string? ExpenseType { get; set; }

    public string? InvoiceNo { get; set; }

    public DateTime? InvoiceDate { get; set; }

    public string? Type { get; set; }

    public string? InvoiceType { get; set; }

    public string? Status { get; set; }

    public string? ImmediatePay { get; set; }

    public string? BillToParty { get; set; }

    public string? VendorName { get; set; }

    public string? PayMode { get; set; }

    public DateTime? PayRquredDate { get; set; }

    public double? InvoiceValue { get; set; }

    public double? Tds { get; set; }

    public string? RimNonRim { get; set; }

    public string? BillType { get; set; }

    public string? JbNo { get; set; }

    public string? TdsResaon { get; set; }

    public bool? IsUpdated { get; set; }
}
