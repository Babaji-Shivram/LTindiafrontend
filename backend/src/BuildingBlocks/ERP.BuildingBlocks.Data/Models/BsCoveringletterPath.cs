using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsCoveringletterPath
{
    public int LId { get; set; }

    public long? BillId { get; set; }

    public int Jobid { get; set; }

    public int? Customerid { get; set; }

    public string MasterInvoiceNo { get; set; } = null!;

    public DateTime? MasterInvoiceDate { get; set; }

    public string? DocPath { get; set; }

    public string? FileName { get; set; }

    public int? LUser { get; set; }

    public DateTime? DtDate { get; set; }

    public int? Bdel { get; set; }
}
