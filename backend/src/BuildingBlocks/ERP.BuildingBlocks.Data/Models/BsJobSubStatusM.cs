using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsJobSubStatusM
{
    public int LId { get; set; }

    public string? SName { get; set; }

    public int? LOrder { get; set; }

    public bool BDel { get; set; }

    public DateTime DtDate { get; set; }
}
