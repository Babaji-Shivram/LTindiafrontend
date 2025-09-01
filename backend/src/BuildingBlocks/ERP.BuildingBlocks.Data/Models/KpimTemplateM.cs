using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class KpimTemplateM
{
    public int Lid { get; set; }

    public string? KpiName { get; set; }

    public int? ModuleId { get; set; }

    public int? Bdel { get; set; }

    public DateTime? DtDate { get; set; }

    public int? LUser { get; set; }
}
