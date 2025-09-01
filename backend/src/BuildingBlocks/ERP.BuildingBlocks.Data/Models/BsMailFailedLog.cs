using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsMailFailedLog
{
    public long Lid { get; set; }

    public long LastMailItemId { get; set; }

    public string? LastTimeStamp { get; set; }

    public DateTime DtDate { get; set; }

    public bool BDel { get; set; }
}
