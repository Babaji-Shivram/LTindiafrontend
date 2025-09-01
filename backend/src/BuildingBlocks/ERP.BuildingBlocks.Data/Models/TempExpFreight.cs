using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class TempExpFreight
{
    public long Lid { get; set; }

    public int? EnqId { get; set; }

    public string? Bjvno { get; set; }

    public string? Vchno { get; set; }

    public string? Contraname { get; set; }

    public decimal? Debitamt { get; set; }

    public decimal? Creditamt { get; set; }

    public decimal? Amount { get; set; }

    public string? Narration { get; set; }
}
