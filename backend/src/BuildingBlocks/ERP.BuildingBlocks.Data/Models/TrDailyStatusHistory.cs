using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class TrDailyStatusHistory
{
    public int Lid { get; set; }

    public int TransReqId { get; set; }

    public string? CurrentStatus { get; set; }

    public string? EmailTo { get; set; }

    public string? EmailCc { get; set; }

    public bool IsActive { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public bool BDel { get; set; }
}
