using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsPortM
{
    public int Lid { get; set; }

    public string PortName { get; set; } = null!;

    public string? PortCode { get; set; }

    public int LMode { get; set; }

    public int? CityId { get; set; }

    public string? DutyAccountName { get; set; }

    public string? PortHeadEmail { get; set; }

    public string? IcePortName { get; set; }

    /// <summary>
    /// 1 - Sea, 2 -Air, 3 ICD
    /// </summary>
    public int? IcePortType { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public bool BDel { get; set; }
}
