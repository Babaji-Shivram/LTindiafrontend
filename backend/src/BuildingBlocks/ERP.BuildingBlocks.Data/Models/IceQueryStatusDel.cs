using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class IceQueryStatusDel
{
    public int Lid { get; set; }

    public int JobId { get; set; }

    public string? CurrentQueue { get; set; }

    public string? QueryRaised { get; set; }

    public string? QueryReply { get; set; }

    public DateTime? ReplyDate { get; set; }

    public string? Replystatus { get; set; }

    public bool IsActive { get; set; }

    public DateTime DtDate { get; set; }

    public bool BDel { get; set; }

    public DateTime? UpdDate { get; set; }
}
