using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class CrmOpportunityBudget
{
    public int Lid { get; set; }

    public int LeadId { get; set; }

    public int? ServiceId { get; set; }

    public int BudgetId { get; set; }

    public string BudgetValue { get; set; } = null!;

    public int? BudgetUnitId { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public int? UpdUser { get; set; }

    public DateTime? UpdDate { get; set; }

    public bool BDel { get; set; }
}
