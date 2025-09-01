using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsPassingStageM
{
    public int LId { get; set; }

    public string StageName { get; set; } = null!;

    public string? Remark { get; set; }

    public int? LUser { get; set; }

    public DateTime? DtDate { get; set; }

    public bool BDel { get; set; }
}
