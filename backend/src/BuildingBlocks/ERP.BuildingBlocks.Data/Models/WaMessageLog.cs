using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class WaMessageLog
{
    public long Lid { get; set; }

    /// <summary>
    /// 1 - Message, 2 - Acknowledge
    /// </summary>
    public int? EventTypeId { get; set; }

    public string? SenderPhone { get; set; }

    public string? SenderName { get; set; }

    /// <summary>
    /// 1 - User, 2 - Group
    /// </summary>
    public int? SenderType { get; set; }

    public string? SentTimeStamp { get; set; }

    public string? MessageUid { get; set; }

    public string? MesssageCuid { get; set; }

    /// <summary>
    /// 1 - Input, 2 - Output
    /// </summary>
    public int? MesssageDirectionId { get; set; }

    /// <summary>
    /// 1 - Chat, 2 - Image, 3 - Video, 4 - Audio 5, Document, 6 - vCard, 7 -Location, 10 Other
    /// </summary>
    public int? MessageTypeId { get; set; }

    public string? MessageBody { get; set; }

    /// <summary>
    /// 0 - Not Sent to Server,  1 - Sent To Server,  2 Delivered To Recipient, 3 Read Receipt
    /// </summary>
    public int? AcknowledgeId { get; set; }

    public DateTime DtDate { get; set; }

    public DateTime? UpdDate { get; set; }

    public bool BDel { get; set; }
}
