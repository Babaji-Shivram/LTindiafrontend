using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsJobUnlock
{
    public int Lid { get; set; }

    public int JobId { get; set; }

    public DateTime UnlockDate { get; set; }

    public int LUser { get; set; }

    public bool BDel { get; set; }

    public DateTime DtDate { get; set; }
}
