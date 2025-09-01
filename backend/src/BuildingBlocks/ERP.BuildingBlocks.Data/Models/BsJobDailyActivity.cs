using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsJobDailyActivity
{
    public int LId { get; set; }

    public int JobId { get; set; }

    public string? DailyProgress { get; set; }

    public string? DocumentPath { get; set; }

    public int SummaryStatus { get; set; }

    public bool IsActive { get; set; }

    public bool IsCustomerVisible { get; set; }

    public string? JobReason { get; set; }

    public int LUserId { get; set; }

    public DateTime DtDate { get; set; }

    public int? UpdUser { get; set; }

    public DateTime? UpdDate { get; set; }

    public bool BDel { get; set; }
}
