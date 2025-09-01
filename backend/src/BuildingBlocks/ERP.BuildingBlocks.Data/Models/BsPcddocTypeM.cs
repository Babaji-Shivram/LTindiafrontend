using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsPcddocTypeM
{
    public int LId { get; set; }

    public string SName { get; set; } = null!;

    public int LUser { get; set; }

    public bool BDel { get; set; }

    public DateTime DtDate { get; set; }

    public int? LType { get; set; }
}
