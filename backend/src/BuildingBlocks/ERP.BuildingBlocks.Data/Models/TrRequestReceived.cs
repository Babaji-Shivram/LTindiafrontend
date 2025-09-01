using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class TrRequestReceived
{
    public long Lid { get; set; }

    public long JobId { get; set; }

    public string JobRefNo { get; set; } = null!;

    /// <summary>
    /// Transport Request Received From Module - Import -1, Freight -2
    /// </summary>
    public int ReceivedFrom { get; set; }

    public DateTime RequestDate { get; set; }

    public bool? IsVehiclePlaced { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public bool BDel { get; set; }
}
