using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class FopJobDeliveryM
{
    public int EnqId { get; set; }

    public int? DeliveryType { get; set; }

    public DateOnly? TruckRequestDate { get; set; }

    public string? DeliveryDestination { get; set; }

    public DateOnly? DeliveryDate { get; set; }

    public string? DeliveryAddress { get; set; }

    public string? DeliveryInstruction { get; set; }

    public bool TransportationByBabaji { get; set; }

    public DateOnly? LastDispatchDate { get; set; }

    public bool? IsMobile { get; set; }

    public int? TransportBillStatus { get; set; }

    public string? PkgDimensions { get; set; }

    public string? Dimension { get; set; }

    public DateTime? VehiclePlaceDate { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public int? UpdUser { get; set; }

    public DateTime? UpdDate { get; set; }

    public bool BDel { get; set; }
}
