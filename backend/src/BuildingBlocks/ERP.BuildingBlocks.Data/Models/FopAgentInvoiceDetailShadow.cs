using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class FopAgentInvoiceDetailShadow
{
    public long AuditId { get; set; }

    public long Lid { get; set; }

    public long EnqId { get; set; }

    public DateTime? InvoiceReceivedDate { get; set; }

    public string? Jbnumber { get; set; }

    public DateTime? Jbdate { get; set; }

    public int? AgentId { get; set; }

    public string AgentName { get; set; } = null!;

    public string InvoiceNo { get; set; } = null!;

    public DateTime? InvoiceDate { get; set; }

    public decimal? InvoiceAmount { get; set; }

    public int InvoiceCurrencyId { get; set; }

    public decimal? Bjvamount { get; set; }

    public string? Remark { get; set; }

    public decimal? Inrvalue { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public int? UpdUser { get; set; }

    public DateTime? UpdDate { get; set; }

    public bool BDel { get; set; }

    public string AuditAction { get; set; } = null!;

    public DateTime AuditDate { get; set; }

    public string AuditUser { get; set; } = null!;

    public string? AuditApp { get; set; }
}
