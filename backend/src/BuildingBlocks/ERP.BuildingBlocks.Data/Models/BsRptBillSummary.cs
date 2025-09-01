using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsRptBillSummary
{
    public int Lid { get; set; }

    public int DeptId { get; set; }

    public string? DeptName { get; set; }

    public int? SubDeptId { get; set; }

    public string? SubDeptName { get; set; }

    public string? GroupName { get; set; }

    public int? GroupId { get; set; }

    public int? Quantity { get; set; }

    public int FinYear { get; set; }

    public string FinYearName { get; set; } = null!;

    public int ModuleId { get; set; }

    public string ModuleName { get; set; } = null!;

    public DateTime? DtDate { get; set; }

    public bool? Bdel { get; set; }
}
