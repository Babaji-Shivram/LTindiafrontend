using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class VnGstregType
{
    public int LId { get; set; }

    public string GstregTypeName { get; set; } = null!;

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public bool BDel { get; set; }
}
