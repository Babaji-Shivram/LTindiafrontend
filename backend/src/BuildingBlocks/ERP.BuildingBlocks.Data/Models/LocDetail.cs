using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class LocDetail
{
    public int LTypId { get; set; }

    public int LId { get; set; }

    public string SName { get; set; } = null!;

    public string? SCode { get; set; }

    public string? SRemarks { get; set; }

    public int? StateCode { get; set; }

    public string? BjvbookCode { get; set; }

    public int LPrevId { get; set; }

    public int? LLevelId { get; set; }

    public int? LIndexId { get; set; }

    public int? LUserId { get; set; }

    public int? LDate { get; set; }

    public DateTime? DtDate { get; set; }

    public int? LVersion { get; set; }

    public bool? BDel { get; set; }
}
