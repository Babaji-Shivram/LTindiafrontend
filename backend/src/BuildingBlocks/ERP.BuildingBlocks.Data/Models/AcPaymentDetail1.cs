using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class AcPaymentDetail1
{
    public int Lid { get; set; }

    public int PaymentId { get; set; }

    public string? VoucherNo { get; set; }

    public int? VendorId { get; set; }

    public int? CurrencyId { get; set; }

    public string? Rate { get; set; }

    public int? JobId { get; set; }

    public string? RefNo { get; set; }

    public string? PoddocPath { get; set; }

    public DateOnly? PaymentDate { get; set; }

    public string? ChequeNo { get; set; }

    public DateOnly? ChequeDate { get; set; }

    public string? BankName { get; set; }

    public string? Favouring { get; set; }

    public string? Remark { get; set; }

    public int? AcpnonAcp { get; set; }

    public string? Tr6challenNo { get; set; }

    public int? PaymentType { get; set; }

    public string? PenaltyAppMail { get; set; }

    public decimal? AssessableValue { get; set; }

    public decimal? CustomDuty { get; set; }

    public decimal? StampDuty { get; set; }

    public string? Gstno { get; set; }

    public decimal? DutyAmount { get; set; }

    public decimal? InterestAmount { get; set; }

    public decimal? PenaltyAmount { get; set; }

    public string? PenaltyCopyPath { get; set; }

    public decimal? Total { get; set; }

    public int? IsPaymentComplete { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public int? UpdUser { get; set; }

    public DateTime? UpdDate { get; set; }

    public bool BDel { get; set; }
}
