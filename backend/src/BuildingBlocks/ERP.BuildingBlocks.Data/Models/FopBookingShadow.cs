using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class FopBookingShadow
{
    public long AuditId { get; set; }

    public int LId { get; set; }

    public string? FrjobNo { get; set; }

    public int EnqId { get; set; }

    public int? LStatusDeleted { get; set; }

    public string? BookingDetails { get; set; }

    public DateTime? BookingDate { get; set; }

    public string? InvoiceNo { get; set; }

    public DateTime? InvoiceDate { get; set; }

    public string? Ponumber { get; set; }

    public bool? BookingStatus { get; set; }

    public bool? AgentPreAlertStatus { get; set; }

    public bool? CustPreAlertStatus { get; set; }

    public bool? Canstatus { get; set; }

    public bool? Dostatus { get; set; }

    public bool? AgentInvoiceStatus { get; set; }

    public int? FinYear { get; set; }

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
