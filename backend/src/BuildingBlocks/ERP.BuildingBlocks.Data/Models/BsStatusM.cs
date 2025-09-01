using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsStatusM
{
    public int Lid { get; set; }

    public string Status { get; set; } = null!;

    public int LOrder { get; set; }

    public DateTime DtDate { get; set; }

    public bool BDel { get; set; }
}
