using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class TrVehicleTravelLog
{
    public long Lid { get; set; }

    public int VehicleId { get; set; }

    public DateTime StatusDate { get; set; }

    public string? DriverName { get; set; }

    public string? EmployeeName { get; set; }

    public string? LocationTo { get; set; }

    public string? OutTime { get; set; }

    public string? InTime { get; set; }

    public long? OpenReading { get; set; }

    public long? CloseReading { get; set; }

    public string? FuelLiter { get; set; }

    public string? FuelAmount { get; set; }

    public string? FuelType { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public bool BDel { get; set; }

    public DateTime? UpdDate { get; set; }

    public int? UpdUser { get; set; }
}
