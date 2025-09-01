using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class CrmOpportunityMom
{
    public int Lid { get; set; }

    public bool IsExistingCust { get; set; }

    public int? CustomerId { get; set; }

    public int? LeadId { get; set; }

    public string? Title { get; set; }

    public DateOnly? Date { get; set; }

    public DateTime? StartTime { get; set; }

    public DateTime? EndTime { get; set; }

    public string? Observers { get; set; }

    public string? Resources { get; set; }

    public string? SpecialNotes { get; set; }

    public bool IsMobile { get; set; }

    public int? FinYear { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public int? UpdUser { get; set; }

    public DateTime? UpdDate { get; set; }

    public bool BDel { get; set; }
}
