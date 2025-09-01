using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class TrMaintenanceCategory
{
    public int Lid { get; set; }

    public string SName { get; set; } = null!;

    public string? SCode { get; set; }

    /// <summary>
    /// 1-Transport Vehicle,2 - Vessel
    /// </summary>
    public int LType { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public bool BDel { get; set; }
}
