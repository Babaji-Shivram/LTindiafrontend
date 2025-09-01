using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class TrVehicleRevenue
{
    public int LId { get; set; }

    public int? VehicleId { get; set; }

    public DateTime? Billdate { get; set; }

    public string? Vchno { get; set; }

    public string? Ref { get; set; }

    public string? Cname { get; set; }

    public string? PaidTo { get; set; }

    public string? Rno { get; set; }

    public DateTime? Lrdate { get; set; }

    public string? Truckno { get; set; }

    public string? DestFrom { get; set; }

    public string? DestTo { get; set; }

    public double? Quantity { get; set; }

    public double? Rate { get; set; }

    public double? Amount { get; set; }

    public bool BDel { get; set; }
}
