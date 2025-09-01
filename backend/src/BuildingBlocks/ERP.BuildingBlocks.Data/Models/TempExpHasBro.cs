using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class TempExpHasBro
{
    public int Lid { get; set; }

    public int? JobId { get; set; }

    public string? Fileno { get; set; }

    public string? Importer { get; set; }

    public double? Extra { get; set; }

    public string? Remark { get; set; }

    public int? Con20 { get; set; }

    public int? Con40 { get; set; }

    public int? Lcl { get; set; }

    public decimal? GrossWeight { get; set; }
}
