using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsQueryFieldM
{
    public int LId { get; set; }

    public string SName { get; set; } = null!;

    public string QueryName { get; set; } = null!;

    public int? LOrder { get; set; }

    public bool BDel { get; set; }

    public DateTime DtDate { get; set; }
}
