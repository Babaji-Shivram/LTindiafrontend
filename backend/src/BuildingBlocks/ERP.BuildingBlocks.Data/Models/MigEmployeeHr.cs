using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class MigEmployeeHr
{
    public int Sl { get; set; }

    public string? EmpCode { get; set; }

    public string? EmployeeName { get; set; }

    public string? ShortName { get; set; }

    public string? Designation { get; set; }

    public string? BranchCode { get; set; }

    public string? DepartmentCode { get; set; }

    public string? SubLocation { get; set; }

    public string? Segments { get; set; }
}
