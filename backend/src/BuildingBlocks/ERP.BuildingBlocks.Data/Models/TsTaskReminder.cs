using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class TsTaskReminder
{
    public int Lid { get; set; }

    public int? CategoryId { get; set; }

    public int? NotificationModeId { get; set; }

    public DateOnly? DueDate { get; set; }

    public int? RepeatMonth { get; set; }

    public string? Remark { get; set; }

    public bool RemindStatus { get; set; }

    public int? ParentId { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public int? UpdUser { get; set; }

    public DateTime? UpdDate { get; set; }

    public bool BDel { get; set; }
}
