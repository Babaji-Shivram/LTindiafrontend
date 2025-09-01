using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class IceSbquery
{
    public int Lid { get; set; }

    public int Sbid { get; set; }

    public int QueryNo { get; set; }

    public DateTime? QueryDate { get; set; }

    public string? QueryText { get; set; }

    public string? QueryPendingWith { get; set; }

    public string? QueryOfficerName { get; set; }

    public DateTime? QueryReplyDate { get; set; }

    public bool BDel { get; set; }

    public DateTime DtDate { get; set; }

    public DateTime? UpdDate { get; set; }
}
