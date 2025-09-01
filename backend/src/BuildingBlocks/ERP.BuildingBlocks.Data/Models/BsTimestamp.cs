using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsTimestamp
{
    public int LId { get; set; }

    /// <summary>
    /// 1 - CB- Import, 5 CB -Export
    /// </summary>
    public int ModuleId { get; set; }

    public string Timestamp { get; set; } = null!;

    public string? Remark { get; set; }

    public DateTime DtDate { get; set; }

    public bool BDel { get; set; }
}
