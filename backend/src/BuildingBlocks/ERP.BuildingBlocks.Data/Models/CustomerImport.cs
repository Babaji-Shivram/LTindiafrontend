using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class CustomerImport
{
    public string SrNo { get; set; } = null!;

    public string? Code { get; set; }

    public string? CustomeName { get; set; }

    public string? EmployeeName { get; set; }

    public string? Designation { get; set; }

    public string? Email { get; set; }

    public string? Password { get; set; }
}
