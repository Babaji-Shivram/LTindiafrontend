using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class FrShipmentTypeM
{
    public int Lid { get; set; }

    public string? Sname { get; set; }

    public DateTime? DtDate { get; set; }

    public int? LUser { get; set; }

    public int? Bdel { get; set; }
}
