using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class TrVehicleDailyStatus
{
    public long Lid { get; set; }

    public int VehicleId { get; set; }

    public DateOnly StatusDate { get; set; }

    public int StatusId { get; set; }

    public int? DriverId { get; set; }

    public bool DriverPresent { get; set; }

    public string? DriverName { get; set; }

    public string? DriverMobile { get; set; }

    public string Remark { get; set; } = null!;

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public int? UpdUser { get; set; }

    public DateTime? UpdDate { get; set; }

    public bool BDel { get; set; }
}
