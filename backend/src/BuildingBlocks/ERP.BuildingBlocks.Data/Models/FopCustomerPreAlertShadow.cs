using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class FopCustomerPreAlertShadow
{
    public long AuditId { get; set; }

    public long LId { get; set; }

    public int EnqId { get; set; }

    public DateTime? ShippedOnBoardDate { get; set; }

    public DateTime? PreAlertToCustDate { get; set; }

    public string? CustomerEmail { get; set; }

    public bool? AlertEmailSent { get; set; }

    public DateTime? AlertEmailDate { get; set; }

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
