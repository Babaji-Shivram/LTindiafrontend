using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class MigBjvPostTran
{
    public int Lid { get; set; }

    public string? JobNo { get; set; }

    public string? InvoiceNo { get; set; }

    public DateTime? InvoiceDate { get; set; }

    public string? Jbno { get; set; }

    public string? Transporter { get; set; }

    public double? TotalValue { get; set; }

    public string? NewJbNo { get; set; }

    public int? RequestId { get; set; }
}
