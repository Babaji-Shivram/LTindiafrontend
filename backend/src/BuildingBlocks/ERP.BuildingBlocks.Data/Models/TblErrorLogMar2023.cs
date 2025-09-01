using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class TblErrorLogMar2023
{
    public decimal? LoginId { get; set; }

    public string? FormName { get; set; }

    public string? Event { get; set; }

    public string? ErrorNumber { get; set; }

    public string? Description { get; set; }

    public DateTime? DateTime { get; set; }
}
