using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsPcdfinalTypingDate
{
    public long Lid { get; set; }

    public long JobId { get; set; }

    public DateTime FinalTypingDate { get; set; }

    public string? FauserName { get; set; }

    public int? LUser { get; set; }

    public DateTime DtDate { get; set; }

    public int? UpdUser { get; set; }

    public DateTime UpdDate { get; set; }

    public bool BDel { get; set; }

    public bool? Isactive { get; set; }

    public DateTime? Invdate { get; set; }

    public string? Invno { get; set; }

    public int? Invamount { get; set; }

    public int? ModuleId { get; set; }
}
