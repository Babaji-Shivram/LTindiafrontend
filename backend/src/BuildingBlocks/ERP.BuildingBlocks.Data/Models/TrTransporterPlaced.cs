using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class TrTransporterPlaced
{
    public long Lid { get; set; }

    public int TransRequestId { get; set; }

    public int TransporterId { get; set; }

    public int? TotalVehiclePlaced { get; set; }

    public int? TotalVehicleDelivered { get; set; }

    public int? TotalVehicleMovement { get; set; }

    public bool? TransMovementStatus { get; set; }

    public int? TransBillStatus { get; set; }

    public int LUser { get; set; }

    public bool BDel { get; set; }

    public DateTime DtDate { get; set; }

    public int? UpdUser { get; set; }

    public DateTime? UpdDate { get; set; }
}
