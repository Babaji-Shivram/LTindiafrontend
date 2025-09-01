using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class TrEquipmentM
{
    public int Lid { get; set; }

    public string SName { get; set; } = null!;

    public string? ReportName { get; set; }

    public string? CompanyName { get; set; }

    public int LType { get; set; }

    public string? SType { get; set; }

    public string? Model { get; set; }

    public string? RegYear { get; set; }

    public string? Capacity { get; set; }

    public string? FuelAverage { get; set; }

    public string? WorkSite { get; set; }

    public bool IsTransport { get; set; }

    public string? Remark { get; set; }

    public int LUser { get; set; }

    public bool Bdel { get; set; }

    public DateTime DtDate { get; set; }

    public int? UpdUser { get; set; }

    public DateTime? UpdDate { get; set; }

    public string? ChassisNo { get; set; }

    public string? EngineNo { get; set; }
}
