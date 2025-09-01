using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class ExShipmentTermM
{
    public int Lid { get; set; }

    public string SName { get; set; } = null!;

    public string? SRemarks { get; set; }

    public bool BDel { get; set; }
}
