using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsQuotationStatusM
{
    public int Lid { get; set; }

    public string SName { get; set; } = null!;

    public int? LOrder { get; set; }

    public bool BDel { get; set; }
}
