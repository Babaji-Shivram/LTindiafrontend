using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class AdmVoucherDetail
{
    public long Lid { get; set; }

    public string TokanNo { get; set; } = null!;

    public string VoucherNo { get; set; } = null!;

    public DateOnly VoucherDate { get; set; }

    public int? ExpenseTypeId { get; set; }

    public int? ExpenseSubTypeId { get; set; }

    public DateTime? StartDate { get; set; }

    public DateTime? EndDate { get; set; }

    public int? FinalInvoiceId { get; set; }

    public int? ProformaInvoiceId { get; set; }

    public bool? IsFinalInvoicePending { get; set; }

    public string ConsigneeGstin { get; set; } = null!;

    public string? ConsigneeName { get; set; }

    public string? ConsigneeCode { get; set; }

    public string? ConsigneePan { get; set; }

    public int? VendorId { get; set; }

    public int? VendorGstntype { get; set; }

    public string? VendorPan { get; set; }

    public int? InvoiceType { get; set; }

    public decimal? VoucherAmount { get; set; }

    public int? VoucherCurrencyId { get; set; }

    public decimal? VoucherCurrencyAmt { get; set; }

    public decimal? VoucherCurrencyExchangeRate { get; set; }

    public int? PaymentTypeId { get; set; }

    public string? VendorName { get; set; }

    public string? VendorCode { get; set; }

    public DateTime? PaymentRequiredDate { get; set; }

    public DateTime? PaymentDueDate { get; set; }

    public string? Gstno { get; set; }

    public decimal? Gstrate { get; set; }

    public decimal? Gstamount { get; set; }

    public decimal? TaxAmount { get; set; }

    public decimal? Cgst { get; set; }

    public decimal? Sgst { get; set; }

    public decimal? Igst { get; set; }

    public decimal? OtherDeduction { get; set; }

    public decimal? TotalAmount { get; set; }

    public decimal? PaidAmount { get; set; }

    public int? TdsexemptReasonId { get; set; }

    public int? TransactionTypeId { get; set; }

    public bool? IsNoItc { get; set; }

    public bool? Tdsapplicable { get; set; }

    public string? TdsledgerCode { get; set; }

    public int TdsledgerCodeId { get; set; }

    public int? TdsrateType { get; set; }

    public decimal? Tdsrate { get; set; }

    public decimal? TdstotalAmount { get; set; }

    public bool? Rcmapplicable { get; set; }

    public string? RcmledgerCode { get; set; }

    public decimal? Rcmrate { get; set; }

    public int? RcmgstType { get; set; }

    public decimal? RcmtotalAmount { get; set; }

    public bool? IsNoItcrcm { get; set; }

    public int? BillType { get; set; }

    public int InvoiceMode { get; set; }

    public string? CompanyCode { get; set; }

    public int? BranchId { get; set; }

    public int? DivisionId { get; set; }

    public int? VendorCategoryId { get; set; }

    public string? PaymentTerms { get; set; }

    public int? Hodid { get; set; }

    public bool? IsImmediatePayment { get; set; }

    public string? DocDir { get; set; }

    public string? Remark { get; set; }

    public int LStatus { get; set; }

    public bool? IsBjvjbposting { get; set; }

    public bool? IsBjvpaymentPosting { get; set; }

    public string? Bjvjbnumber { get; set; }

    public bool? IsProformaHold { get; set; }

    public int? FinYear { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public DateTime? UpdDate { get; set; }

    public int? UpdUser { get; set; }

    public bool BDel { get; set; }
}
