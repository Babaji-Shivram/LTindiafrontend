using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class TrBranchWsRequest
{
    public int Lid { get; set; }

    public int BranchId { get; set; }

    public string SEmail { get; set; } = null!;

    public bool BDel { get; set; }
}
