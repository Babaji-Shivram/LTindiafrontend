using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsModuleM
{
    public int LId { get; set; }

    public string SName { get; set; } = null!;

    public string? SCode { get; set; }

    public string? LedgerCode { get; set; }

    public string? ReportName { get; set; }

    public string? Gstin { get; set; }

    public int LUser { get; set; }

    public bool BDel { get; set; }

    public DateTime DtDate { get; set; }
}
