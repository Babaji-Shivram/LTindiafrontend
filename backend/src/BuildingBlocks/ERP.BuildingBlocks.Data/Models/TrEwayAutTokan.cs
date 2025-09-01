using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class TrEwayAutTokan
{
    public int Lid { get; set; }

    public int? EwayApiid { get; set; }

    public string EwayAuthTokan { get; set; } = null!;

    public DateTime ValidTillDate { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public bool BDel { get; set; }
}
