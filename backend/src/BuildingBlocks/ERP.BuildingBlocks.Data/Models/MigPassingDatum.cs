using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class MigPassingDatum
{
    public int? Sl { get; set; }

    public int? JobId { get; set; }

    public string? BsjobNo { get; set; }

    public string? JobType { get; set; }

    public string? BoeType { get; set; }

    public double? Boeno { get; set; }

    public DateTime? Boedate { get; set; }

    public string? Consignee { get; set; }

    public string? FirstCheckRequired { get; set; }

    public string? Aprrasingdate { get; set; }

    public string? Assessmentdate { get; set; }

    public string? RmsNonRms { get; set; }

    public string? Begroup { get; set; }

    public DateOnly? Aprrasingdate2 { get; set; }

    public DateOnly? Assessmentdate2 { get; set; }
}
