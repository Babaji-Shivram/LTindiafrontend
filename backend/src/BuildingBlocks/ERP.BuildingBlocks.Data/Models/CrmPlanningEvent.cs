using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class CrmPlanningEvent
{
    public int Lid { get; set; }

    public int? CompanyId { get; set; }

    public string? CompanyName { get; set; }

    public DateOnly? VisitDate { get; set; }

    public string? PersonName { get; set; }

    public string Notes { get; set; } = null!;

    public bool IsReminded { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public int? UpdUser { get; set; }

    public DateTime? UpdDate { get; set; }

    public bool BDel { get; set; }
}
