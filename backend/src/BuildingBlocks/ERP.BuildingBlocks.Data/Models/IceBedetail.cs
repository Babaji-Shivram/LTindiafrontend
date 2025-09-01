using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class IceBedetail
{
    public int Lid { get; set; }

    public int? JobId { get; set; }

    public int? Beno { get; set; }

    public DateTime? Bedate { get; set; }

    public string? Iecno { get; set; }

    public decimal? TotalValue { get; set; }

    public string? Typ { get; set; }

    public string? Chano { get; set; }

    public string? FirstCheckStatus { get; set; }

    public string? PriorBestatus { get; set; }

    public string? Sec48status { get; set; }

    public bool? FirstCheck { get; set; }

    public bool? PriorBe { get; set; }

    public bool? Sec48 { get; set; }

    public string? AppGroup { get; set; }

    public decimal? TotalAssess { get; set; }

    public int? TotalPkgs { get; set; }

    public decimal? GrossWt { get; set; }

    public decimal? TotalDuty { get; set; }

    public decimal? FinePenalty { get; set; }

    public string? Wbeno { get; set; }

    public bool IsActive { get; set; }

    public bool? BDel { get; set; }

    public DateTime DtDate { get; set; }

    public DateTime? UpdDate { get; set; }
}
