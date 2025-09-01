using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsBeprovisional
{
    public int Lid { get; set; }

    public int JobId { get; set; }

    public string? ProvisionalRemark { get; set; }

    public DateTime? BondExecutionDate { get; set; }

    public DateTime? BondClosureDate { get; set; }

    public DateTime? StatusDate { get; set; }

    public int? LUser { get; set; }

    public DateTime? DtDate { get; set; }

    public bool? BDel { get; set; }
}
