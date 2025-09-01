using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsMailFailedItem
{
    public long Lid { get; set; }

    public long MailItemId { get; set; }

    public int? UserId { get; set; }

    /// <summary>
    /// 1- Mail Sent, 0 - Mail Sending Failed
    /// </summary>
    public bool? SentStatus { get; set; }

    public DateTime DtDate { get; set; }

    public bool BDel { get; set; }

    public DateTime? UpdDate { get; set; }
}
