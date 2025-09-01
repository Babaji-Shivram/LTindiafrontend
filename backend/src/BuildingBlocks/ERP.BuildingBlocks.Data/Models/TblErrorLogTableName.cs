using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class TblErrorLogTableName
{
    public decimal UniqueId { get; set; }

    public string? ActualTableName { get; set; }

    public string? DisplayTableName { get; set; }

    public decimal? AddedBy { get; set; }

    public DateTime? AddedOn { get; set; }
}
