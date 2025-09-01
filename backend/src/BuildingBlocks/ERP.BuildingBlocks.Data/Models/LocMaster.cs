using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class LocMaster
{
    public int LId { get; set; }

    public string? SCode { get; set; }

    public string? SName { get; set; }

    public string? SRemarks { get; set; }

    public int? LPrevId { get; set; }

    public int? BDefault { get; set; }

    public int? LIndexId { get; set; }

    public int? LUserId { get; set; }

    public int? LDate { get; set; }

    public DateTime? DtDate { get; set; }

    public int? LVersion { get; set; }

    public bool? BDel { get; set; }
}
