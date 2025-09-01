using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BjvExpenseDetail
{
    public long Lid { get; set; }

    public long? JobId { get; set; }

    public string? Bjvno { get; set; }

    public DateOnly? Vchdate { get; set; }

    public string? Vchno { get; set; }

    public string? Contraname { get; set; }

    public string? Chqno { get; set; }

    public DateTime? Chqdate { get; set; }

    public int? Debitamt { get; set; }

    public int? Creditamt { get; set; }

    public int? Amount { get; set; }

    public int? LUser { get; set; }

    public DateTime? DtDate { get; set; }

    public int? BDel { get; set; }

    public string? Narration { get; set; }

    public int? ModuleId { get; set; }

    public string? ParCode { get; set; }

    public DateTime? UpdDate { get; set; }

    public DateTime? FacheckDate { get; set; }
}
