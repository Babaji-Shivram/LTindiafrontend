using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsDorequiredDoc
{
    public int Lid { get; set; }

    public int JobId { get; set; }

    public int? DorequiredDoc { get; set; }

    public int? LUser { get; set; }

    public DateTime? DtDate { get; set; }

    public bool BDel { get; set; }
}
