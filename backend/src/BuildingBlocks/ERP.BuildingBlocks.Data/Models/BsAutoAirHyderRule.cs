using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;
public partial class BsAutoAirHyderRule
{
    public int LId { get; set; }

    public string SName { get; set; } = null!;

    public string? ReportHeading { get; set; }

    public int? OldRate { get; set; }

    public int PaidCharges { get; set; }

    public int MaxPayable { get; set; }

    public string Description { get; set; } = null!;

    public bool? Rms { get; set; }

    public bool? NonRms { get; set; }

    /// <summary>
    /// 1 for Standard and 2 for Additional Expense
    /// </summary>
    public int LType { get; set; }

    public bool IsStandardRequired { get; set; }

    public string? Remark { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public DateTime? UpdDate { get; set; }

    public bool Bdel { get; set; }
}
