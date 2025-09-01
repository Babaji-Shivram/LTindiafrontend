using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsDutyStatusDetail
{
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

    public decimal? Bcdamt { get; set; }

    public decimal? SocialSurchargeAmt { get; set; }

    public decimal? EducationCessAmount { get; set; }

    public decimal? InterestAmt { get; set; }

    public decimal? FinePenalty { get; set; }

    public decimal? PenaltyAmount { get; set; }

    public decimal? DutyPaidAmount { get; set; }

    public string? Remark { get; set; }

    public int? LUserId { get; set; }

    public DateTime DtDate { get; set; }

    public int? UpdUser { get; set; }

    public DateTime? UpdDate { get; set; }

    public bool BDel { get; set; }

    public virtual ICollection<BsTruncatePreventKey> BsTruncatePreventKeys { get; set; } = new List<BsTruncatePreventKey>();
}
