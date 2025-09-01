using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsPcdfinalCheckingDate
{
    public long Lid { get; set; }

    public long JobId { get; set; }

    public DateTime FinalCheckingDate { get; set; }

    public string? Remark { get; set; }

    public int? LUser { get; set; }

    public DateTime DtDate { get; set; }

    public int? UpdUser { get; set; }

    public DateTime UpdDate { get; set; }

    public bool BDel { get; set; }

    public bool? Isactive { get; set; }

    public string? Correct { get; set; }

    public int? ModuleId { get; set; }
}
