using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class VnKycdocm
{
    public int LId { get; set; }

    public string SName { get; set; } = null!;

    public string? SRemark { get; set; }

    /// <summary>
    /// (2 - PN Movement)
    /// </summary>
    public int? LType { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public bool BDel { get; set; }
}
