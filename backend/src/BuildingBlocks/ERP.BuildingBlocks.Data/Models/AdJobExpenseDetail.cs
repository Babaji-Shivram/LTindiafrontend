using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class AdJobExpenseDetail
{
    public long Lid { get; set; }

    public int? JobId { get; set; }

    public string? Bjvno { get; set; }

    public DateOnly? Vchdate { get; set; }

    public string? Vchno { get; set; }

    public string? Contraname { get; set; }

    public string? Chqno { get; set; }

    public DateOnly? Chqdate { get; set; }

    public int? Debitamt { get; set; }

    public int? Creditamt { get; set; }

    public int? Amount { get; set; }

    public int? Luser { get; set; }

    public DateTime? Dtdate { get; set; }

    public int? Bdel { get; set; }

    public string? Narration { get; set; }
}
