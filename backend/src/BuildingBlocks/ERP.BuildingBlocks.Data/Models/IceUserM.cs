using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class IceUserM
{
    public int LId { get; set; }

    public string? BranchName { get; set; }

    public string SName { get; set; } = null!;

    public string SCode { get; set; } = null!;

    public string PortCode { get; set; } = null!;

    public string PortName { get; set; } = null!;

    /// <summary>
    /// 0 - Main Login - Branch, 1 Sub Login - Port
    /// </summary>
    public int? LType { get; set; }

    /// <summary>
    /// Main LoginId - Branch
    /// </summary>
    public int? ParentId { get; set; }

    public int? LOrder { get; set; }

    public string? DeptHeadEmail { get; set; }

    public DateTime? SyncDate { get; set; }

    public bool BDel { get; set; }

    public DateTime DtDate { get; set; }
}
