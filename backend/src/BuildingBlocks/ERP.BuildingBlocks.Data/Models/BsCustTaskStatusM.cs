using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsCustTaskStatusM
{
    public int Lid { get; set; }

    public string? SName { get; set; }

    public DateTime? DtDate { get; set; }

    public int? BDel { get; set; }
}
