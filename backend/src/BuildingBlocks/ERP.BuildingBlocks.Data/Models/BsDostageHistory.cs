using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsDostageHistory
{
    public int LId { get; set; }

    public int JobId { get; set; }

    public int DostageId { get; set; }

    public string? PickupPerson { get; set; }

    public int LUser { get; set; }

    public bool BDel { get; set; }

    public DateTime DtDate { get; set; }
}
