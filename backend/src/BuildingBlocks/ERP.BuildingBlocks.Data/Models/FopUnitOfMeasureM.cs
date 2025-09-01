using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class FopUnitOfMeasureM
{
    public int LId { get; set; }

    public string UnitOfMeasurement { get; set; } = null!;

    public string? SCode { get; set; }

    public DateTime DtDate { get; set; }

    public bool BDel { get; set; }
}
