using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsPackageTypeM
{
    public int LId { get; set; }

    public string SName { get; set; } = null!;

    public string? SCode { get; set; }

    public int? LUser { get; set; }

    public bool Bdel { get; set; }

    public DateTime DtDate { get; set; }
}
