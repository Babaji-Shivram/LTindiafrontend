using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class TrMigvehicleExp
{
    public int Lid { get; set; }

    public DateTime? ExpForMonth { get; set; }

    public DateTime? ExpPaymentDate { get; set; }

    public DateTime? ExpForDate { get; set; }

    public int? VehicleId { get; set; }

    public string? VehicleNo { get; set; }

    public double? TollCharges { get; set; }

    public string? FineWithoutCleaner { get; set; }

    public double? Xerox { get; set; }

    public string? VaraiUnloading { get; set; }

    public string? Emptycontainerreciept { get; set; }

    public double? ParkingGatePass { get; set; }

    public string? Garage { get; set; }

    public string? Bhatta { get; set; }

    public string? AdditionalChargesOdc { get; set; }

    public string? Bhatta1 { get; set; }

    public double? OtherCharges { get; set; }

    public string? DamageContainer { get; set; }
}
