using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class IceSbdetail
{
    public int Lid { get; set; }

    public long JobId { get; set; }

    public int? IceJobNo { get; set; }

    public DateTime? IceJobDate { get; set; }

    public int? IceSbno { get; set; }

    public DateTime? IceSbdate { get; set; }

    public string? IceIec { get; set; }

    public string? IceChaNo { get; set; }

    public string? IcePod { get; set; }

    public int? IcePkgs { get; set; }

    public decimal? IceGrossWt { get; set; }

    public decimal? IceFob { get; set; }

    public decimal? IceCess { get; set; }

    public decimal? IceDrawback { get; set; }

    public decimal? IceStr { get; set; }

    public bool IsActive { get; set; }

    public bool Bdel { get; set; }

    public DateTime DtDate { get; set; }

    public DateTime? UpdDate { get; set; }

    public string? TotalDbkStr { get; set; }

    public string? CinNo { get; set; }

    public string? CinDate { get; set; }
}
