using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsBranchJobCode
{
    public int LId { get; set; }

    public int BranchId { get; set; }

    public int TransMode { get; set; }

    public string JobCode { get; set; } = null!;

    public string? Jvpcode { get; set; }

    public string? Vcode { get; set; }

    public bool BDel { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }
}
