using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class SezCountryOriginM
{
    public int Cid { get; set; }

    public string Cname { get; set; } = null!;

    public int? LUser { get; set; }

    public DateTime DtDate { get; set; }

    public bool BDel { get; set; }
}
