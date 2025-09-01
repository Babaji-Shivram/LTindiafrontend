using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class KpiKpidetail
{
    public int Lid { get; set; }

    public int KpiparentId { get; set; }

    public int Kpiid { get; set; }

    public int UserId { get; set; }

    public string UserName { get; set; } = null!;

    public string? Kpiachieved { get; set; }

    public int? Incentive { get; set; }

    public int? Penalty { get; set; }

    public DateTime Kpidate { get; set; }

    public string Kpimonth { get; set; } = null!;

    public DateTime DtDate { get; set; }

    public bool Bdel { get; set; }
}
