using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsAutoJobSeaKolkShadow
{
    public long AuditId { get; set; }

    public long LId { get; set; }

    public long JobId { get; set; }

    public long? DeliveryId { get; set; }

    public int AutoExpenseId { get; set; }

    public int? ContainerId { get; set; }

    public int? PaidCharges { get; set; }

    public int ExpenseFor { get; set; }

    public int? LUser { get; set; }

    public DateTime DtDate { get; set; }

    public DateTime? UpdDate { get; set; }

    public bool BDel { get; set; }

    public string AuditAction { get; set; } = null!;

    public DateTime AuditDate { get; set; }

    public string AuditUser { get; set; } = null!;

    public string? AuditApp { get; set; }
}
