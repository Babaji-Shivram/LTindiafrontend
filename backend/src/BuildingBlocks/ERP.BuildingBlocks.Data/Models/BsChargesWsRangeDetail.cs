using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsChargesWsRangeDetail
{
    public int Lid { get; set; }

    public int ChargeId { get; set; }

    public string? Currency { get; set; }

    public decimal MinRange { get; set; }

    public decimal MaxRange { get; set; }

    public int ApplicableOn { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public int? UpdUser { get; set; }

    public DateTime? UpdDate { get; set; }

    public bool BDel { get; set; }
}
