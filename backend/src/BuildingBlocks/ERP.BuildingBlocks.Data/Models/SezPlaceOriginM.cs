using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class SezPlaceOriginM
{
    public int Pid { get; set; }

    public string Pname { get; set; } = null!;

    public int? LUser { get; set; }

    public DateTime DtDate { get; set; }

    public bool BDel { get; set; }
}
