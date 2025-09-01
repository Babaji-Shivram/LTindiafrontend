using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class MpMyPaccoLog
{
    public long Lid { get; set; }

    public string? Apiaction { get; set; }

    public string? AppUserName { get; set; }

    public string? ErrCode { get; set; }

    public bool? IsSuccess { get; set; }

    public string? OutcomeMsg { get; set; }

    public string? TxnDateTime { get; set; }

    public int? LUser { get; set; }

    public DateTime DtDate { get; set; }
}
