using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class ImsDispatchItem
{
    public long Lid { get; set; }

    public string EmpName { get; set; } = null!;

    public int ItemId { get; set; }

    public long Quantity { get; set; }

    public int DeptId { get; set; }

    public int BranchId { get; set; }

    public DateTime? DispatchDate { get; set; }

    public int? Finyear { get; set; }

    public int LUser { get; set; }

    public DateTime Dtdate { get; set; }

    public bool Bdel { get; set; }
}
