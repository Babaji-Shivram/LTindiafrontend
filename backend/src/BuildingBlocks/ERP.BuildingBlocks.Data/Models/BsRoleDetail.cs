using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsRoleDetail
{
    public int LId { get; set; }

    public int LRoleId { get; set; }

    public int? LModuleId { get; set; }

    public string? Ctyp { get; set; }

    public int? LTaskId { get; set; }

    public string? STaskId { get; set; }

    public int? LTypId { get; set; }

    public int? LMode { get; set; }

    public DateTime DtDate { get; set; }

    public int? LUserId { get; set; }

    public int BDel { get; set; }
}
