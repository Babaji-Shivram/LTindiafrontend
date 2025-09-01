using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsMistakeLog
{
    public int Lid { get; set; }

    public int MistakeBy { get; set; }

    public DateTime? MistakeDate { get; set; }

    public int? Amount { get; set; }

    public string MistakeRemarks { get; set; } = null!;

    public string? CustomerName { get; set; }

    public string? ResolveRemark { get; set; }

    public int? ResolvedBy { get; set; }

    public int? LStatus { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public int? UpdUser { get; set; }

    public DateTime? UpdDate { get; set; }

    public bool BDel { get; set; }
}
