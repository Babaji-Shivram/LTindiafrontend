using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class TrsDraftFinalDetail
{
    public long Lid { get; set; }

    public long? JobId { get; set; }

    public string? Bjvno { get; set; }

    public string? Draftby { get; set; }

    public DateTime? Draftdate { get; set; }

    public string? Drfcompby { get; set; }

    public DateTime? Drfcompdate { get; set; }

    public string? Flby { get; set; }

    public DateTime? Fldate { get; set; }

    public DateTime? Invdate { get; set; }

    public string? Invno { get; set; }

    public int? Invamount { get; set; }

    public bool? IsBill { get; set; }

    public string? Remark { get; set; }

    public string? Adjno { get; set; }

    public DateTime? Adjdate { get; set; }

    public decimal? Adjamount { get; set; }

    public DateTime DtDate { get; set; }

    public DateTime? UpdDate { get; set; }

    public int? Bdel { get; set; }
}
