using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class ExChecklistStatusM
{
    public int Lid { get; set; }

    public string SName { get; set; } = null!;

    public string? SRemark { get; set; }

    public bool BDel { get; set; }
}
