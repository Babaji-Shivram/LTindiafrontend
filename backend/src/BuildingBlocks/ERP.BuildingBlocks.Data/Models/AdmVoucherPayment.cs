using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class AdmVoucherPayment
{
    public int Lid { get; set; }

    public int SrNo { get; set; }

    public int VoucherId { get; set; }

    public int PaymentTypeId { get; set; }

    public int? BankId { get; set; }

    public int? BankAccountId { get; set; }

    public string? BankCode { get; set; }

    public string? BankName { get; set; }

    public string? AccountNo { get; set; }

    public int? VendorBankAccountId { get; set; }

    public bool? IsFundTransFromApi { get; set; }

    public int? InvoiceMemoId { get; set; }

    public string? RequestRefNo { get; set; }

    public string? InstrumentNo { get; set; }

    public DateTime? InstrumentDate { get; set; }

    public decimal? PaidAmount { get; set; }

    public bool? IsFullPayment { get; set; }

    public int? PaymentCurrencyId { get; set; }

    public decimal? PaymentCurrencyRate { get; set; }

    public bool IsPaid { get; set; }

    public bool? IsMailSent { get; set; }

    public int? TransactionStatus { get; set; }

    public string? DocPath { get; set; }

    public string? Remark { get; set; }

    public string? BjvpaymentNo { get; set; }

    public int? IsBjvpaymentFlag { get; set; }

    public int? BjvpaymentFlagBy { get; set; }

    public DateTime? BjvpaymentFlagDate { get; set; }

    public bool? IsBatchPay { get; set; }

    public int? BatchPayUser { get; set; }

    public DateTime? BatchPayDate { get; set; }

    public bool? IsConsolidatePay { get; set; }

    public int? ConsolePayId { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public DateTime? UpdDate { get; set; }

    public int? UpdUser { get; set; }

    public bool BDel { get; set; }
}
