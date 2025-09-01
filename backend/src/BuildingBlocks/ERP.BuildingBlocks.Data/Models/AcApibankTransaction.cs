using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class AcApibankTransaction
{
    public int Lid { get; set; }

    public int BankId { get; set; }

    public int PaymentRequestId { get; set; }

    public string ReqReferenceNo { get; set; } = null!;

    public string? RespReferenceNo { get; set; }

    public string? UniqueReferenceNo { get; set; }

    public string? RespStatus { get; set; }

    public DateTime? ReqDate { get; set; }

    public DateTime? RespDate { get; set; }

    public decimal? Amount { get; set; }

    public string? Currency { get; set; }

    public string? CreditorAccountIfsc { get; set; }

    public string? CreditorAccountNo { get; set; }

    public string? CreditorAccountName { get; set; }

    /// <summary>
    /// Null - Payment In Process, 0 - Payment Failed, 1 Payment Success
    /// </summary>
    public bool? IsSuccess { get; set; }

    /// <summary>
    /// Bank Response Status
    /// </summary>
    public int? StatusId { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public DateTime? UpdDate { get; set; }

    public bool BDel { get; set; }
}
