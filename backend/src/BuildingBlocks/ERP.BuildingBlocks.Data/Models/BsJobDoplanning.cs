using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsJobDoplanning
{
    public int Lid { get; set; }

    public int JobId { get; set; }

    public DateTime? DopaymentDate { get; set; }

    public DateOnly? ConsolDoProcessDt { get; set; }

    public DateOnly? FinalDoProcessDt { get; set; }

    public int? Department { get; set; }

    public int? DotypeOfDelivery { get; set; }

    public string? Remark { get; set; }

    public int? DocHandoverTo { get; set; }

    public DateOnly? DocHandoverDate { get; set; }

    public int? IsDoSecurity { get; set; }

    /// <summary>
    /// 1 - Cheque , 2 - DD
    /// </summary>
    public int? SecType { get; set; }

    public string? SecChequeNo { get; set; }

    public DateTime? SecChequeDt { get; set; }

    public DateTime? SecFollowupDt { get; set; }

    public string? SecRemark { get; set; }

    public DateTime? SecChequeCancelDt { get; set; }

    public int? SecStatus { get; set; }

    public int? LUser { get; set; }

    public DateTime? DtDate { get; set; }

    public int? UpdUser { get; set; }

    public DateTime? UpdDate { get; set; }

    public bool BDel { get; set; }
}
