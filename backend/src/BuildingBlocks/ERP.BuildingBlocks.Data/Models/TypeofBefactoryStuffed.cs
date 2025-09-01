using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class TypeofBefactoryStuffed
{
    public int Lid { get; set; }

    public string BesbtypeName { get; set; } = null!;

    public string LUser { get; set; } = null!;

    public DateTime DtDate { get; set; }

    public bool BDel { get; set; }
}
