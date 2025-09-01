using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;
public partial class AcConsolidateJob
{
    public int Lid { get; set; }

    public int PaymentId { get; set; }

    public int JobId { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public bool BDel { get; set; }
}
