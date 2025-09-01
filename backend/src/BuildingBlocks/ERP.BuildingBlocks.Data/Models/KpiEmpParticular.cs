using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class KpiEmpParticular
{
    public long Lid { get; set; }

    public long Kpiid { get; set; }

    public string Kpiparticular { get; set; } = null!;

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public int? UpdUser { get; set; }

    public DateTime? UpdDate { get; set; }

    public bool BDel { get; set; }
}
