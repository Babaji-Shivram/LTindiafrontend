using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class SrServiceRequest
{
    public long Lid { get; set; }

    public string EmpName { get; set; } = null!;

    public string BranchName { get; set; } = null!;

    public int DeptId { get; set; }

    public DateTime RequestDate { get; set; }

    public string? RequestRemark { get; set; }

    public string? ResolveRemark { get; set; }

    public int? ResolvedBy { get; set; }

    public DateTime? ResolvedDate { get; set; }

    public bool IsResolved { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public bool BDel { get; set; }
}
