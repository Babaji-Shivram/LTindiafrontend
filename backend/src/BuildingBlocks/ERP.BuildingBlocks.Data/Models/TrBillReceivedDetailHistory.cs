using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class TrBillReceivedDetailHistory
{
    public int Lid { get; set; }

    public int TransBillId { get; set; }

    public int? SentUser { get; set; }

    public DateTime? SentDate { get; set; }

    public int? ReceivedBy { get; set; }

    public DateTime? ReceivedDate { get; set; }

    public int? StatusId { get; set; }

    public string? ChequeNo { get; set; }

    public DateOnly? ChequeDate { get; set; }

    public string? HoldReason { get; set; }

    public DateOnly? ReleaseDate { get; set; }

    public int? Priority { get; set; }

    public bool IsActive { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public int? UpdUser { get; set; }

    public DateTime? UpdDate { get; set; }

    public bool BDel { get; set; }
}
