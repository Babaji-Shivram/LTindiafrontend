using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class FopCustomerMsShadow
{
    public long AuditId { get; set; }

    public int Lid { get; set; }

    public string SName { get; set; } = null!;

    public string? SAddress { get; set; }

    public int? LUser { get; set; }

    public DateTime DtDate { get; set; }

    public bool BDel { get; set; }

    public string AuditAction { get; set; } = null!;

    public DateTime AuditDate { get; set; }

    public string AuditUser { get; set; } = null!;

    public string? AuditApp { get; set; }
}
