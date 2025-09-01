using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class AcPaymentRequest
{
    public int Lid { get; set; }

    public int JobId { get; set; }

    public string? FarefNo { get; set; }

    public int? TransReqId { get; set; }

    public int RequestTypeId { get; set; }

    public int? PaymentTypeId { get; set; }

    public int? InvoiceType { get; set; }

    public string? InvoiceNo { get; set; }

    public DateTime? InvoiceDate { get; set; }

    public decimal Amount { get; set; }

    public decimal? TaxAmount { get; set; }

    public string? PaidTo { get; set; }

    public int? VendorId { get; set; }

    public int? BranchId { get; set; }

    public string? Remark { get; set; }

    public bool AdvanceReceived { get; set; }

    public decimal? AdvanceAmt { get; set; }

    public decimal? AdvanceTds { get; set; }

    public int StatusId { get; set; }

    public int? IsInterestReq { get; set; }

    public int? IsPenaltyReq { get; set; }

    public decimal? TotalAmnt { get; set; }

    public decimal? OtherDeduction { get; set; }

    public decimal? PaidAmount { get; set; }

    public int? IsPaymentProcess { get; set; }

    public bool? Tdsapplicable { get; set; }

    public string? TdsledgerCode { get; set; }

    public int? TdsledgerCodeId { get; set; }

    public int? TdsrateType { get; set; }

    public decimal? Tdsrate { get; set; }

    public decimal? TdstotalAmount { get; set; }

    public bool? IsBjvjbbooking { get; set; }

    public bool? IsBjvpaymentPosting { get; set; }

    public int? ModuleId { get; set; }

    public int? BillId { get; set; }

    public string? Bjvjbnumber { get; set; }

    public int? IsError { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public int? UpdUser { get; set; }

    public DateTime? UpdDate { get; set; }

    public bool BDel { get; set; }
}
