using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class CrmShareLead
{
    public int Lid { get; set; }

    public int LeadId { get; set; }

    public int AssignedTo { get; set; }

    public string? Remark { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public bool BDel { get; set; }

    public int? PrevLeadOwner { get; set; }
}
