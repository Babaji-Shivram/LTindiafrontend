using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class CrmRequirement
{
    public int Lid { get; set; }

    public int LeadId { get; set; }

    public int ServiceId { get; set; }

    public string Notes { get; set; } = null!;

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public bool BDel { get; set; }
}
