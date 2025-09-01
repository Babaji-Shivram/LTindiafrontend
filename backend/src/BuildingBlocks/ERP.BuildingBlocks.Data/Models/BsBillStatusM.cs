using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsBillStatusM
{
    public int Lid { get; set; }

    public string BillStatusName { get; set; } = null!;

    public string? Remark { get; set; }

    public int LUser { get; set; }

    public bool BDel { get; set; }

    public DateTime DtDate { get; set; }
}
