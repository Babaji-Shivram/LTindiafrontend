using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsDeliveryConsolidate
{
    public long Lid { get; set; }

    public string VehicleNo { get; set; } = null!;

    public string? TransporterName { get; set; }

    public int? TransporterId { get; set; }

    public DateTime? DispatchDate { get; set; }

    public bool? CommonLr { get; set; }

    public bool? IsMobile { get; set; }

    public long LUser { get; set; }

    public DateTime DtDate { get; set; }

    public bool BDel { get; set; }
}
