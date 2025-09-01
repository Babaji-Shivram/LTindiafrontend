using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsConsolidate
{
    public long ConsolidateId { get; set; }

    public long JobId { get; set; }

    public bool JStatus { get; set; }

    public long LUser { get; set; }

    public int Lid { get; set; }

    public int? DeliveryId { get; set; }

    public bool? BDel { get; set; }

    public DateTime? DtDate { get; set; }
}
