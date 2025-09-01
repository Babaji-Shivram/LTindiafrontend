using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class InvReceiveDetail
{
    public long Lid { get; set; }

    public long TokanId { get; set; }

    public int LStatus { get; set; }

    public int SenderId { get; set; }

    public DateTime SentDate { get; set; }

    public int? ReceivedBy { get; set; }

    public DateTime? ReceivedDate { get; set; }

    public bool IsActive { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public DateTime? UpdDate { get; set; }

    public bool BDel { get; set; }
}
