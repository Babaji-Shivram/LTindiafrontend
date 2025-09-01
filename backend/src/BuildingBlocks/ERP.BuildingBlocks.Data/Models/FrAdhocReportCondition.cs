using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class FrAdhocReportCondition
{
    public int LId { get; set; }

    public int ReportId { get; set; }

    public int ConditionCloumnId { get; set; }

    public string? ColumnDataType { get; set; }

    public int LUser { get; set; }

    public bool BDel { get; set; }

    public DateTime DtDate { get; set; }
}
