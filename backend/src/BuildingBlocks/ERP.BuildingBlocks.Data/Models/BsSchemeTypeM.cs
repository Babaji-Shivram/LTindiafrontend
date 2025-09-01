using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsSchemeTypeM
{
    public int LId { get; set; }

    public string SchemeType { get; set; } = null!;

    /// <summary>
    /// 1 for License, 2 for Scheme, 3 For Certificate
    /// </summary>
    public int? LType { get; set; }

    public string? SRemarks { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public bool BDel { get; set; }
}
