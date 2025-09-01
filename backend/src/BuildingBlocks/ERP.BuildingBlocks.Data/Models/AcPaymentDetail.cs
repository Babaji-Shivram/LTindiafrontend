using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class AcPaymentDetail
{
    public int Lid { get; set; }

    public int SrNo { get; set; }

    public int RequestId { get; set; }

    public int PaymentTypeId { get; set; }

    public int? BankId { get; set; }

    public int? BankAccountId { get; set; }

    public string? BankCode { get; set; }

    public string? BankName { get; set; }

    public string? AccountNo { get; set; }

    public int? VendorBankAccountId { get; set; }

    public bool? IsFundTransFromApi { get; set; }

    public string? RequestRefNo { get; set; }

    public string? InstrumentNo { get; set; }

    public DateTime? InstrumentDate { get; set; }

    public decimal? PaidAmount { get; set; }

    public bool? IsFullPayment { get; set; }

    public bool IsPaid { get; set; }

    /// <summary>
    /// Payment Confirmation Email Sent Status
    /// </summary>
    public bool? IsMailSent { get; set; }

    public int? TransactionStatus { get; set; }

    public int? PayMemoId { get; set; }

    public bool? IsBatchPay { get; set; }

    public int? BatchPayUser { get; set; }

    public DateTime? BatchPayDate { get; set; }

    public string? DocPath { get; set; }

    public string? Remark { get; set; }

    public string? BjvpaymentNo { get; set; }

    /// <summary>
    /// Flag Status - 0 - Pending, 1 Flagged,2 Not Flagged, 3 -- Flag Checking Error, 4 Moved To Access Payment
    /// </summary>
    public int? IsBjvpaymentFlag { get; set; }

    /// <summary>
    /// 0 - Pending, 1 - Live Tracking, 2 FA System
    /// </summary>
    public int? BjvpaymentFlagBy { get; set; }

    public DateTime? BjvpaymentFlagDate { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public DateTime? UpdDate { get; set; }

    public int? UpdUser { get; set; }

    public bool BDel { get; set; }
}
