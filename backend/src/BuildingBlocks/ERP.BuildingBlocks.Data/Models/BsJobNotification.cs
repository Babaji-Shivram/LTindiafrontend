using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsJobNotification
{
    public long LId { get; set; }

    public int JobId { get; set; }

    public int ModId { get; set; }

    public int TypeId { get; set; }

    public string SentTo { get; set; } = null!;

    public string? Subject { get; set; }

    public string? Message { get; set; }

    public string? UniqueRef { get; set; }

    public string? Status { get; set; }

    public string? SentCc { get; set; }

    public int LUser { get; set; }

    public bool BDel { get; set; }

    public DateTime DtDate { get; set; }
}
