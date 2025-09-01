using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsJobPcdstatusShadow
{
    public long AuditId { get; set; }

    public int Lid { get; set; }

    public int JobId { get; set; }

    public bool? PcdtoBackOffice { get; set; }

    public bool? PcdtoBillingAdvice { get; set; }

    public bool? PcdtoCustomer { get; set; }

    public bool? PcdtoScrutiny { get; set; }

    public bool? PcdtoBilling { get; set; }

    public bool? PcdtoDispatch { get; set; }

    public bool? PcdtoDispatchCustomer { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public int? UpdUser { get; set; }

    public DateTime? UpdDate { get; set; }

    public bool BDel { get; set; }

    public bool? PcddraftInvoice { get; set; }

    public bool? PcdbillingChecking { get; set; }

    public bool? PcdfinalTyping { get; set; }

    public bool? PcdfinalChecking { get; set; }

    public bool? PcdtoBillDispatch { get; set; }

    public string? PcdfinalTypingComment { get; set; }

    public string AuditAction { get; set; } = null!;

    public DateTime AuditDate { get; set; }

    public string AuditUser { get; set; } = null!;

    public string? AuditApp { get; set; }
}
