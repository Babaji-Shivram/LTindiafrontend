using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class FopBookingDetail
{
    public int Lid { get; set; }

    public int? EnqId { get; set; }

    public int? ShipmentType { get; set; }

    public int? LUser { get; set; }

    public DateTime? DtDate { get; set; }

    public int? BDel { get; set; }

    public DateTime? UpdDate { get; set; }

    public int? UpdUser { get; set; }
}
