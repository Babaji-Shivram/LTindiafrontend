using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsPassingQueryDetail
{
    public int LId { get; set; }

    public int JobId { get; set; }

    public int? QueryNo { get; set; }

    public string PassingQuery { get; set; } = null!;

    public string? QueryReply { get; set; }

    public DateTime QueryDate { get; set; }

    public string? FilePath { get; set; }

    /// <summary>
    /// 0 - Pending, 1 Resolved
    /// </summary>
    public bool Status { get; set; }

    public DateTime? ResolveDate { get; set; }

    public int? ResolveUser { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public bool Bdel { get; set; }
}
