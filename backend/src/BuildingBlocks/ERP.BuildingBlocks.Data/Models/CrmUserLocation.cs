using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class CrmUserLocation
{
    public int Lid { get; set; }

    public int ServiceId { get; set; }

    public int ServiceLocationId { get; set; }

    public int UserId { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public int? UpdUser { get; set; }

    public DateTime? UpdDate { get; set; }

    public bool BDel { get; set; }
}
