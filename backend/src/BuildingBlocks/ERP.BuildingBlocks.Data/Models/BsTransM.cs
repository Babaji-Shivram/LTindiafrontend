using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsTransM
{
    public int Lid { get; set; }

    public string TransMode { get; set; } = null!;

    public bool? BDel { get; set; }

    public DateTime? DtDate { get; set; }
}
