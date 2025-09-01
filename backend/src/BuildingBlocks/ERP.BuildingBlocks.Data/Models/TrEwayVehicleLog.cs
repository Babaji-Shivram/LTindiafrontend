using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class TrEwayVehicleLog
{
    public long Lid { get; set; }

    public long? EwayId { get; set; }

    public string? VehicleNo { get; set; }

    public string? VehicleDate { get; set; }

    public string? FromPlace { get; set; }

    public int? FromStateCode { get; set; }

    public string? Reason { get; set; }

    public bool? IsActive { get; set; }

    public int? LUser { get; set; }

    public DateTime? DtDate { get; set; }

    public bool BDel { get; set; }
}
