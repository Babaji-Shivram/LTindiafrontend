using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class CbCapCriteriaM
{
    public int LId { get; set; }

    public string CapCriteriaName { get; set; } = null!;

    public string? Cccode { get; set; }

    public string? Remarks { get; set; }

    public int? CreatedUser { get; set; }

    public DateTime CreatedDate { get; set; }

    public bool IsActive { get; set; }
}
