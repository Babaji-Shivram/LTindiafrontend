using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsChargesCategory
{
    public int Lid { get; set; }

    public int ChargeId { get; set; }

    public int QuoteCatgId { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public bool BDel { get; set; }
}
