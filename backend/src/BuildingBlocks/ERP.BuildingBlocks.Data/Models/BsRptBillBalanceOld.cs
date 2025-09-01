using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsRptBillBalanceOld
{
    public int Lid { get; set; }

    public int DeptId { get; set; }

    public string? DeptName { get; set; }

    public int? SubDeptId { get; set; }

    public string? SubDeptName { get; set; }

    public string? GroupName { get; set; }

    public int? GroupId { get; set; }

    public int FinYear { get; set; }

    public int ModuleId { get; set; }

    public int NewFiles { get; set; }

    public int CompletedToday { get; set; }

    public int ClosingBal { get; set; }
}
