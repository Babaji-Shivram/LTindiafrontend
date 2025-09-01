using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class FrAdhocReportM
{
    public int LId { get; set; }

    public string ReportName { get; set; } = null!;

    public int LUser { get; set; }

    public int? LastReportGeneratedBy { get; set; }

    public DateTime? LastReportGeneratedDate { get; set; }

    public bool BDel { get; set; }

    public DateTime DtDate { get; set; }
}
