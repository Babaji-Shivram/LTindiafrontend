using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class TrPackingListDoc
{
    public int Lid { get; set; }

    public int TransReqId { get; set; }

    public string DocPath { get; set; } = null!;

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public bool BDel { get; set; }
}
