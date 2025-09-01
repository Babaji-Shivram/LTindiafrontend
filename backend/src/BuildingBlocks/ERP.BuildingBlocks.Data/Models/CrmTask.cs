using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class CrmTask
{
    public int Lid { get; set; }

    public int? LeadId { get; set; }

    public int? ServiceId { get; set; }

    /// <summary>
    /// 1=&gt;Task,2=&gt;MOM
    /// </summary>
    public int? ActivityTypeId { get; set; }

    public string? Subject { get; set; }

    public string? Notes { get; set; }

    public int? AssignedTo { get; set; }

    public int? CategoryId { get; set; }

    public DateTime? DueDate { get; set; }

    public DateTime? DueTime { get; set; }

    public DateOnly? RemindDate { get; set; }

    public DateTime? RemindTime { get; set; }

    public int? PriorityId { get; set; }

    public int? StatusId { get; set; }

    public bool? IsActive { get; set; }

    public string? ReferenceLink { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public int? UpdUser { get; set; }

    public DateTime? UpdDate { get; set; }

    public bool BDel { get; set; }
}
