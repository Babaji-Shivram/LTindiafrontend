using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsPriorityM
{
    public int Lid { get; set; }

    public string SName { get; set; } = null!;

    public DateTime? DtDate { get; set; }

    public bool? Bdel { get; set; }
}
