using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class FrAdhocReportDetail
{
    public long LId { get; set; }

    public int ReportId { get; set; }

    public int ColumnId { get; set; }

    public int? LOrder { get; set; }

    public int LUser { get; set; }

    public bool BDel { get; set; }

    public DateTime DtDate { get; set; }
}
