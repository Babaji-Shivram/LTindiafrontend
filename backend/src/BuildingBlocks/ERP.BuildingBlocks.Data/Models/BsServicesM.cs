using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsServicesM
{
    public int Lid { get; set; }

    public string SName { get; set; } = null!;

    public string SCode { get; set; } = null!;

    public bool BDel { get; set; }
}
