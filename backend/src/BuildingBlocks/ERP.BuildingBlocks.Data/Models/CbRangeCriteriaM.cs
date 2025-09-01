using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class CbRangeCriteriaM
{
    public int LId { get; set; }

    public string RangeCriteriaName { get; set; } = null!;

    public string? Rccode { get; set; }

    public string? Remarks { get; set; }

    public int? CreatedUser { get; set; }

    public DateTime CreatedDate { get; set; }

    public bool IsActive { get; set; }
}
