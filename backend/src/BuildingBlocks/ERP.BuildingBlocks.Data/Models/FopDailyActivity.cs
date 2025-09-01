using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class FopDailyActivity
{
    public long LId { get; set; }

    public long EnqId { get; set; }

    public string? DailyProgress { get; set; }

    public string? DocumentPath { get; set; }

    public int? StatusId { get; set; }

    public bool IsActive { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public int? UpdUser { get; set; }

    public DateTime UpdDate { get; set; }

    public bool BDel { get; set; }
}
