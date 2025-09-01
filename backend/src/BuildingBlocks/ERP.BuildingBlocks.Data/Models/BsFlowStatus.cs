using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsFlowStatus
{
    public int Lid { get; set; }

    public string StatusName { get; set; } = null!;

    public int LOrder { get; set; }

    public int? Betype { get; set; }

    public bool BDel { get; set; }
}
