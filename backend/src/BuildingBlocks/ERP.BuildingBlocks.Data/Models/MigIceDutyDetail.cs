using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class MigIceDutyDetail
{
    public int Lid { get; set; }

    public int Beid { get; set; }

    public string? ChallanNo { get; set; }

    public decimal? DutyAmount { get; set; }

    public decimal? FineAmount { get; set; }

    public decimal? InterestAmount { get; set; }

    public decimal? PenalAmount { get; set; }

    public decimal? TotalDuty { get; set; }

    public decimal? DutyPaid { get; set; }

    public string? PayMode { get; set; }

    public DateTime DtDate { get; set; }

    public bool BDel { get; set; }

    public DateTime? UpdDate { get; set; }
}
