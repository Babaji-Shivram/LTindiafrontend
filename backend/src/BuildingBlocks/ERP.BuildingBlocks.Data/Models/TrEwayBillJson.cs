using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class TrEwayBillJson
{
    public int Lid { get; set; }

    public int EwayId { get; set; }

    public string EwayJson { get; set; } = null!;

    public DateTime? DtDate { get; set; }

    public bool? BDel { get; set; }
}
