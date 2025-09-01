using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class KpimTemplateDetail
{
    public int Lid { get; set; }

    public int? Kpiid { get; set; }

    public string? Name { get; set; }

    public int? TabId { get; set; }

    public int? FirstFieldId { get; set; }

    public int? SecondFieldId { get; set; }

    public int? CalculationId { get; set; }

    public int? ConditionalField { get; set; }

    public decimal? Target { get; set; }

    public decimal? PerformanceIncentive { get; set; }

    public decimal? Kpi { get; set; }

    public int? Bdel { get; set; }

    public DateTime? DtDate { get; set; }

    public int? LUser { get; set; }

    public DateTime? UpdDate { get; set; }

    public int? UpdId { get; set; }
}
