using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class TrVehicleDriver
{
    public int Lid { get; set; }

    public int VehicleId { get; set; }

    public int DriverId { get; set; }

    public string? Remark { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public bool BDel { get; set; }

    public DateTime UpdDate { get; set; }

    public int? UpdUser { get; set; }
}
