using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class TrVehicleRateExpense
{
    public int Lid { get; set; }

    public int? RateId { get; set; }

    public decimal? Fuel { get; set; }

    public decimal? FuelLiter { get; set; }

    public decimal? Fuel2 { get; set; }

    public decimal? Fuel2Liter { get; set; }

    public decimal? TollCharges { get; set; }

    public decimal? FineWithoutCleaner { get; set; }

    public decimal? Xerox { get; set; }

    public decimal? VaraiUnloading { get; set; }

    public decimal? EmptyContainerReceipt { get; set; }

    public decimal? ParkingGatePass { get; set; }

    public decimal? Garage { get; set; }

    public decimal? Bhatta { get; set; }

    public decimal? AdditionalChargesForOdcoverweight { get; set; }

    public decimal? OtherCharges { get; set; }

    public decimal? NakaPassingDamageContainer { get; set; }

    public decimal? TotalExpense { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public int? UpdUser { get; set; }

    public DateTime? UpdDate { get; set; }

    public bool BDel { get; set; }
}
