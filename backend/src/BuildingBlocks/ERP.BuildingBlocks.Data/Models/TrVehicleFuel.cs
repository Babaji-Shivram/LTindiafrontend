using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class TrVehicleFuel
{
    public int Lid { get; set; }

    public int? VehicleId { get; set; }

    public string? VehicleNo { get; set; }

    public DateTime? FuelDate { get; set; }

    public decimal? FuelAmount { get; set; }

    public int? LUser { get; set; }

    public DateTime? DtDate { get; set; }

    public bool? BDel { get; set; }
}
