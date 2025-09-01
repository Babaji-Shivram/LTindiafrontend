using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class ImsMaintenanceDocument
{
    public long Lid { get; set; }

    public int MaintainId { get; set; }

    public string DocName { get; set; } = null!;

    public string? DocPath { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public bool BDel { get; set; }
}
