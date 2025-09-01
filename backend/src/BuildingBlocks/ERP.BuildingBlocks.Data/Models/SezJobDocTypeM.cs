using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class SezJobDocTypeM
{
    public int LId { get; set; }

    public string DocumentName { get; set; } = null!;

    public int? LOrder { get; set; }

    public int? LUser { get; set; }

    public DateTime DtDate { get; set; }

    public bool BDel { get; set; }
}
