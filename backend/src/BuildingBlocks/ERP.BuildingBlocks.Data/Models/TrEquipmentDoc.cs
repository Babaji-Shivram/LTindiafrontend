using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class TrEquipmentDoc
{
    public long Lid { get; set; }

    public int VehicleId { get; set; }

    public string DocTypeName { get; set; } = null!;

    public int? DocTypeId { get; set; }

    public DateOnly? ValidFrom { get; set; }

    public DateOnly? ValidTill { get; set; }

    public int? ValidityMonth { get; set; }

    public string? DocPath { get; set; }

    public string? Remark { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public DateTime? UpdDate { get; set; }

    public int? UpdUser { get; set; }

    public bool BDel { get; set; }
}
