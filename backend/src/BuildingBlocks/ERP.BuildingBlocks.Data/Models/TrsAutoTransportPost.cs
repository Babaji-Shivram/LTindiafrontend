using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class TrsAutoTransportPost
{
    public int Sl { get; set; }

    public int? RequestId { get; set; }

    public string? ExpenseType { get; set; }

    public string? BookType { get; set; }

    public string? SystemRef { get; set; }

    public string? SystemPaymentRef { get; set; }

    public string? ExcelType { get; set; }

    public string? InvoiceType { get; set; }

    public DateTime? BillDate { get; set; }

    public string? ParCode { get; set; }

    public string? Ref { get; set; }

    public decimal? RAmount { get; set; }

    public string? Charge { get; set; }

    public string? ChargeName { get; set; }

    public string? PaidTo { get; set; }

    public string? Rno { get; set; }

    public DateTime? Date { get; set; }

    public string? Jvpcode { get; set; }

    public DateTime? BillRecdDate { get; set; }

    public string? Narration { get; set; }

    public string Chequeno { get; set; } = null!;

    public DateTime? Chequedt { get; set; }

    public int? SerNo { get; set; }

    public string? Vcode { get; set; }

    public string? Gstin { get; set; }

    public int? Gstpos { get; set; }

    public string? HsnSc { get; set; }

    public decimal? Cgstrt { get; set; }

    public decimal? Cgstamt { get; set; }

    public decimal? Sgstrt { get; set; }

    public decimal? Sgstamt { get; set; }

    public decimal? Igstrt { get; set; }

    public decimal? Igstamt { get; set; }

    public decimal? Amount { get; set; }

    public string? CgstparCode { get; set; }

    public string? SgstparCode { get; set; }

    public string? IgstparCode { get; set; }

    public string? Cstcode1 { get; set; }

    public string? Cstcode2 { get; set; }

    public string? Cstcode3 { get; set; }

    public string? Cstcode4 { get; set; }

    public string? Tdsjvcode { get; set; }

    public decimal? Tdsamt { get; set; }

    public string? Tdscode { get; set; }

    public decimal? TdsgrossAmt { get; set; }

    public decimal? Tdsrate { get; set; }

    public bool? Rcmapp { get; set; }

    public decimal? RcmCgstrt { get; set; }

    public decimal? Rcmcgstamt { get; set; }

    public decimal? RcmSgstrt { get; set; }

    public decimal? Rcmsgstamt { get; set; }

    public decimal? RcmIgstrt { get; set; }

    public decimal? Rcmigstamt { get; set; }

    public string? RcmcgstparCode { get; set; }

    public string? RcmsgstparCode { get; set; }

    public string? RcmIgstparCode { get; set; }

    public decimal? TotalTaxableValue { get; set; }

    public decimal? TotalInvoiceValue { get; set; }

    public decimal? TotalCsgtValue { get; set; }

    public decimal? TotalSgstValue { get; set; }

    public decimal? TotalIgstValue { get; set; }

    public decimal? FlagAmount { get; set; }

    public string? ForexledgerCode { get; set; }

    public decimal? Forexplamount { get; set; }

    public bool Updflag { get; set; }

    public string? Pssvchno { get; set; }

    public bool? IsJbbooking { get; set; }

    public string? RejRemarks { get; set; }

    public DateTime? DtDate { get; set; }
}
