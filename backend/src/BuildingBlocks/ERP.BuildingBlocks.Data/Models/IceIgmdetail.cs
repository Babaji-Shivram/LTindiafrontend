using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class IceIgmdetail
{
    public int Lid { get; set; }

    public int JobId { get; set; }

    /// <summary>
    /// 1 - Import, 2 - Export, 2 Freight
    /// </summary>
    public int LType { get; set; }

    public string MblNo { get; set; } = null!;

    public DateTime? MblDate { get; set; }

    public string? IgmNo { get; set; }

    public DateTime? IgmDate { get; set; }

    public string? HblNo { get; set; }

    public DateTime? HblDate { get; set; }

    public DateTime? InwardDate { get; set; }

    public string? LineNo { get; set; }

    public string? SublineNo { get; set; }

    public string? CargoMove { get; set; }

    public decimal? GrossWt { get; set; }

    public string? WeightUnit { get; set; }

    public int? TotalPkg { get; set; }

    public string? Pkgcode { get; set; }

    public string? PortDestination { get; set; }

    public string? DescOfGoods { get; set; }

    public string? FileName { get; set; }

    public string? GatewayPort { get; set; }

    public string? VoyageNo { get; set; }

    public string? ImoNo { get; set; }

    public string? VesselCode { get; set; }

    public bool? IsValidMbl { get; set; }

    public bool IsActive { get; set; }

    public bool BDel { get; set; }

    public DateTime DtDate { get; set; }

    public DateTime? UpdDate { get; set; }
}
