using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class FopInvoicePercentItemShadow
{
    public long AuditId { get; set; }

    public long Lid { get; set; }

    public int EnqId { get; set; }

    public int InvoiceItemId { get; set; }

    public int PercentItemId { get; set; }

    public decimal InvoiceTotal { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public bool BDel { get; set; }

    public string AuditAction { get; set; } = null!;

    public DateTime AuditDate { get; set; }

    public string AuditUser { get; set; } = null!;

    public string? AuditApp { get; set; }
}
