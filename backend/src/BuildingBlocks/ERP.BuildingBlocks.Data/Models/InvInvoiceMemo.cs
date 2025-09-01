using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class InvInvoiceMemo
{
    public int Lid { get; set; }

    public string InvoiceMemoRefNo { get; set; } = null!;

    public int VendorId { get; set; }

    public decimal? MemoAmount { get; set; }

    public int? TotalRequest { get; set; }

    public string? Remark { get; set; }

    public int? IsApproved { get; set; }

    public int? ApprovedBy { get; set; }

    public DateTime? ApprovedDate { get; set; }

    public int? MemoAuditUser { get; set; }

    public DateTime? MemoAuditDate { get; set; }

    public int? PaymentUserId { get; set; }

    public DateTime? PaymentDate { get; set; }

    public bool? IsApipayment { get; set; }

    public string? Utrno { get; set; }

    public DateTime? Utrdate { get; set; }

    public decimal? ExchangeGainLoss { get; set; }

    public decimal? BankCharges { get; set; }

    public bool? IsPaymentPosted { get; set; }

    public int? LStatus { get; set; }

    public int FinYearId { get; set; }

    public int? BranchId { get; set; }

    public string? FilePath { get; set; }

    public string? FileName { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public bool Bdel { get; set; }

    public int? UpdUser { get; set; }

    public DateTime? UpdDate { get; set; }
}
