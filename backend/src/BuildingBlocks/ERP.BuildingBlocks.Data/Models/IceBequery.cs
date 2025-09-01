using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class IceBequery
{
    public int Lid { get; set; }

    public int? Beid { get; set; }

    public int? QueryNo { get; set; }

    public string? CurrentQueue { get; set; }

    public string? QueryRaised { get; set; }

    public string? QueryReply { get; set; }

    public DateTime? QueryDate { get; set; }

    public DateTime? ReplyDate { get; set; }

    public string? ReplyStatus { get; set; }

    public bool BDel { get; set; }

    public DateTime DtDate { get; set; }

    public DateTime? UpdDate { get; set; }
}
