using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class TsRemainderLog
{
    public int Lid { get; set; }

    public int ReminderId { get; set; }

    public int NotifyId { get; set; }

    public string? SentTo { get; set; }

    public string? Subject { get; set; }

    public string? Message { get; set; }

    public string? Status { get; set; }

    public int? LUser { get; set; }

    public DateTime? DtDate { get; set; }
}
