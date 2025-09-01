using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class CiCommodityM
{
    public int LId { get; set; }

    public string SName { get; set; } = null!;

    public string? Isocode { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public bool BDel { get; set; }
}
