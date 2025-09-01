using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class FrMode
{
    public int LId { get; set; }

    public string SName { get; set; } = null!;

    public DateTime DtDate { get; set; }

    public bool BDel { get; set; }
}
