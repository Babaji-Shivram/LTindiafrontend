using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class IceDrawbackQueryDetail
{
    public int Lid { get; set; }

    public int JobId { get; set; }

    public int SbId { get; set; }

    public string QueryNo { get; set; } = null!;

    public string? QueryDate { get; set; }

    public string? QueryText { get; set; }

    public string? PendingWith { get; set; }

    public string? OfficerName { get; set; }

    public string? ReplyDate { get; set; }

    public bool BDel { get; set; }

    public DateTime DtDate { get; set; }

    public DateTime? UpdDate { get; set; }
}
