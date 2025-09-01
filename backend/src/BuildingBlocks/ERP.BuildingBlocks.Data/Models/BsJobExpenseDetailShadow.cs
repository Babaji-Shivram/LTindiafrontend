using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsJobExpenseDetailShadow
{
    public long AuditId { get; set; }

    public int LId { get; set; }

    public int JobId { get; set; }

    public int TypeId { get; set; }

    public double? Amount { get; set; }

    public string? ReceiptNo { get; set; }

    public string? PayeeName { get; set; }

    public int? ReceiptType { get; set; }

    public string? Location { get; set; }

    public int? PaymentType { get; set; }

    public string? PaidTo { get; set; }

    public string? ReceiptAmount { get; set; }

    public DateOnly? ReceiptDate { get; set; }

    public string? ChequeNo { get; set; }

    public DateOnly? ChequeDate { get; set; }

    public bool? IsBillable { get; set; }

    public string? Remark { get; set; }

    public int? Hodid { get; set; }

    public bool? IsApproved { get; set; }

    public DateTime? ApprovalDate { get; set; }

    public int? ApprovedBy { get; set; }

    public int? ApprovalStatusId { get; set; }

    public string? ApprovalRemark { get; set; }

    public bool? IsJbbooking { get; set; }

    public string? Jbnumber { get; set; }

    public string? SystemRef { get; set; }

    public int? LStatus { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public int? UpdUser { get; set; }

    public DateTime? UpdDate { get; set; }

    public bool BDel { get; set; }

    public string AuditAction { get; set; } = null!;

    public DateTime AuditDate { get; set; }

    public string AuditUser { get; set; } = null!;

    public string? AuditApp { get; set; }
}
