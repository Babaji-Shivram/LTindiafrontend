using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class TrTransMovement
{
    public int Lid { get; set; }

    public int RateId { get; set; }

    public int TransId { get; set; }

    public decimal? CargoWeight { get; set; }

    public DateOnly? ReportingDate { get; set; }

    public DateOnly? LoadingDate { get; set; }

    public DateOnly? UnloadingDate { get; set; }

    public DateOnly? ContReturnDate { get; set; }

    public string? AppDocPath { get; set; }

    public string? AppSignPath { get; set; }

    public string? AppIdpath { get; set; }

    public string? LrpdfPath { get; set; }

    public string? LrreceiveName { get; set; }

    public string? LrreceiveMobile { get; set; }

    public int LUser { get; set; }

    public bool BDel { get; set; }

    public DateTime DtDate { get; set; }

    public DateTime? UpdDate { get; set; }

    public int? UpdUser { get; set; }
}
