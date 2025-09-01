using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class AcFaexpenseBooking
{
    public int Lid { get; set; }

    public int? JobId { get; set; }

    public string JobRefNo { get; set; } = null!;

    public int PayModeId { get; set; }

    /// <summary>
    /// 1 RIM, 2 AG
    /// </summary>
    public int RimorAg { get; set; }

    public string PaidTo { get; set; } = null!;

    public string? PaidToCode { get; set; }

    public int ChequeIssueId { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public bool BDel { get; set; }
}
