using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class FopDebitNote
{
    public int Lid { get; set; }

    public int EnqId { get; set; }

    public decimal? DebitNoteAmount { get; set; }

    public string? DebitNoteRemark { get; set; }

    public decimal? Gstrate { get; set; }

    public decimal? Gstamount { get; set; }

    public decimal? TotalAmount { get; set; }

    public int? AgentId { get; set; }

    public DateTime DtDate { get; set; }

    public int LUser { get; set; }

    public bool BDel { get; set; }

    public DateTime? UpdDate { get; set; }

    public int? UpdUser { get; set; }
}
