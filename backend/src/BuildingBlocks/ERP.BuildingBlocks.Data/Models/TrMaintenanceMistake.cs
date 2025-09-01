using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class TrMaintenanceMistake
{
    public int Lid { get; set; }

    public int MaintainId { get; set; }

    public string PersonName { get; set; } = null!;

    public string? Remark { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public bool BDel { get; set; }
}
