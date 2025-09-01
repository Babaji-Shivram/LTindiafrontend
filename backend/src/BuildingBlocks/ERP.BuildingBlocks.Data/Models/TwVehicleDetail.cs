using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class TwVehicleDetail
{
    public long Lid { get; set; }

    public long TransPortId { get; set; }

    public string VehicleNo { get; set; } = null!;

    public DateOnly LoadingDate { get; set; }

    public int? Packages { get; set; }

    public int? Con20 { get; set; }

    public int? Con40 { get; set; }

    public int LUser { get; set; }

    public bool Bdel { get; set; }

    public DateTime DtDate { get; set; }
}
