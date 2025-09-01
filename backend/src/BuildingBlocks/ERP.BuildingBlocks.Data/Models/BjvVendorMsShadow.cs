using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;
public partial class BjvVendorMsShadow
{
    public long AuditId { get; set; }

    public int Lid { get; set; }

    public string SName { get; set; } = null!;

    public string SCode { get; set; } = null!;

    public string? Ledgcode { get; set; }

    public string? StateName { get; set; }

    public string? Gstin { get; set; }

    public string? PanNo { get; set; }

    public int? CreditDays { get; set; }

    public int VendorType { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public bool BDel { get; set; }

    public int? UpdUser { get; set; }

    public DateTime? UpdDate { get; set; }

    public string AuditAction { get; set; } = null!;

    public DateTime AuditDate { get; set; }

    public string AuditUser { get; set; } = null!;

    public string? AuditApp { get; set; }
}
