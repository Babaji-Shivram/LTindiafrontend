using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class MsJobStatusM
{
    public int LId { get; set; }

    public string StatusName { get; set; } = null!;

    public int? LOrder { get; set; }

    public int ModuleId { get; set; }

    public int? LUser { get; set; }

    public DateTime DtDate { get; set; }

    public bool BDel { get; set; }
}
