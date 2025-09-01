using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class CrmLeadStageHistory
{
    public int Lid { get; set; }

    public int LeadId { get; set; }

    public int StageId { get; set; }

    public string? Remark { get; set; }

    public DateTime? TargetDate { get; set; }

    public bool IsMobile { get; set; }

    public bool IsActive { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public bool BDel { get; set; }
}
