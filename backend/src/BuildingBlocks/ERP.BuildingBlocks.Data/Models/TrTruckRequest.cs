using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class TrTruckRequest
{
    public int Lid { get; set; }

    public string TrrefNo { get; set; } = null!;

    public int JobId { get; set; }

    /// <summary>
    /// 1 =&gt; Import, 2 =&gt; Export
    /// </summary>
    public int? JobType { get; set; }

    public int? DeliveryType { get; set; }

    /// <summary>
    /// 1 =&gt; Factory stuff, 2 =&gt; Doc Stuff, 3 =&gt; others
    /// </summary>
    public int? ExportType { get; set; }

    public string? Destination { get; set; }

    public string? Dimension { get; set; }

    public DateOnly VehiclePlaceRequireDate { get; set; }

    public int? VehiclesDispatched { get; set; }

    public int? ContDispatched { get; set; }

    public int FinYear { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public int? UpdUser { get; set; }

    public DateTime? UpdDate { get; set; }

    public bool BDel { get; set; }
}
