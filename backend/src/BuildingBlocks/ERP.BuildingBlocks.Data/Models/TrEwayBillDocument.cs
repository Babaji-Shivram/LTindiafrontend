using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class TrEwayBillDocument
{
    public long Lid { get; set; }

    public long EwayBillId { get; set; }

    public string? FilePath { get; set; }

    public bool IsActive { get; set; }

    public int LUser { get; set; }

    public bool BDel { get; set; }

    public DateTime DtDate { get; set; }
}
