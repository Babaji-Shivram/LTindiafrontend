using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsDutyStatusDetailShadow
{
    public long AuditId { get; set; }

    public int LId { get; set; }

    public int JobId { get; set; }

    public DateTime? DutyReqDate { get; set; }

    public decimal? DutyAmount { get; set; }

    public DateTime? DutyRecvdDateDeleted { get; set; }

    public DateOnly? DutyPaymentDate { get; set; }

    public int? PaymentType { get; set; }

    public string? ChallanNo { get; set; }

    public DateTime? DdchallanDate { get; set; }

    public string? CopyOfChallan { get; set; }

    public decimal? LicDebitDuty { get; set; }

    public decimal? StampDutyAmount { get; set; }

    public decimal? Igstamt { get; set; }

    public decimal? InterestAmt { get; set; }

    public decimal? FinePenalty { get; set; }

    public string? Remark { get; set; }

    public int? LUserId { get; set; }

    public DateTime DtDate { get; set; }

    public int? UpdUser { get; set; }

    public DateTime? UpdDate { get; set; }

    public bool BDel { get; set; }

    public string AuditAction { get; set; } = null!;

    public DateTime AuditDate { get; set; }

    public string AuditUser { get; set; } = null!;

    public string? AuditApp { get; set; }
}
