using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class InvStampDutyM
{
    public int Lid { get; set; }

    public string SName { get; set; } = null!;

    /// <summary>
    /// 1 - Air, 2 Sea
    /// </summary>
    public int TransModeId { get; set; }

    public int PortId { get; set; }

    public int BranchId { get; set; }

    public int MinValue { get; set; }

    public int MaxValue { get; set; }

    public decimal Rate { get; set; }

    public bool IsFixedCharge { get; set; }

    public decimal RatePercent { get; set; }

    public int? MinApplicableCharges { get; set; }

    public int? MaxApplicableCharges { get; set; }

    public string? Remark { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public int? UpdUser { get; set; }

    public DateTime? UpdDate { get; set; }

    public bool Bdel { get; set; }
}
