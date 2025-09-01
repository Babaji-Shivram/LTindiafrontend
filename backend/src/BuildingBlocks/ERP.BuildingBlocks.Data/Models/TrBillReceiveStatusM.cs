using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class TrBillReceiveStatusM
{
    public int Lid { get; set; }

    public string? SName { get; set; }

    public int? LOrder { get; set; }

    public bool? BDel { get; set; }
}
