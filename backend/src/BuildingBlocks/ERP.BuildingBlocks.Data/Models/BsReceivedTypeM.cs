using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsReceivedTypeM
{
    public int LId { get; set; }

    public int ReceivedId { get; set; }

    public string ReceivedName { get; set; } = null!;

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public bool BDel { get; set; }

    public int? DailyTarget { get; set; }

    public string? Remark { get; set; }

    public string? Monthlytarget { get; set; }

    public int? Noofusers { get; set; }
}
