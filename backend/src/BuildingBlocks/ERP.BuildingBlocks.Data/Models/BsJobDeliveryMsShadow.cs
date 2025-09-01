using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsJobDeliveryMsShadow
{
    public long AuditId { get; set; }

    public int JobId { get; set; }

    public DateOnly? TruckRequestDate { get; set; }

    public string? DeliveryDestination { get; set; }

    public DateOnly? DeliveryDate { get; set; }

    public string? DeliveryAddress { get; set; }

    public string? DeliveryInstruction { get; set; }

    public bool TransportationByBabaji { get; set; }

    public DateOnly? LastDispatchDate { get; set; }

    public bool? IsRunwayDelivery { get; set; }

    public bool? IsMobile { get; set; }

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
