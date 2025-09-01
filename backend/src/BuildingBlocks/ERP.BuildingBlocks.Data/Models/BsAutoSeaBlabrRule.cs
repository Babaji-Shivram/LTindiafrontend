using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsAutoSeaBlabrRule
{
    public int LId { get; set; }

    public string SName { get; set; } = null!;

    public string? ReportHeading { get; set; }

    public bool? Rms { get; set; }

    public bool? NonRms { get; set; }

    public int Charges { get; set; }

    public int? CustomerId { get; set; }

    public int? JobTypeId { get; set; }

    public int? SchemeTypeId { get; set; }

    public string? Remark { get; set; }

    public DateTime DtDate { get; set; }

    public DateTime? UpdDate { get; set; }

    public bool Bdel { get; set; }
}
