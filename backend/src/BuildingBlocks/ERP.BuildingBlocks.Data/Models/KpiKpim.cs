using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class KpiKpim
{
    public int Lid { get; set; }

    public string SName { get; set; } = null!;

    public string SRemark { get; set; } = null!;

    public int ParentId { get; set; }

    public int? Incentive { get; set; }

    public int? Penalty { get; set; }

    public bool IsActive { get; set; }

    public DateTime DtDate { get; set; }

    public bool BDel { get; set; }
}
