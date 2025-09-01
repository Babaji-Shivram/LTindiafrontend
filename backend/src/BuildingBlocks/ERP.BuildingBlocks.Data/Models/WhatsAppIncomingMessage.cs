using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class WhatsAppIncomingMessage
{
    public int Id { get; set; }

    public string? MessageId { get; set; }

    public string? FromNumber { get; set; }

    public string? Timestamp { get; set; }

    public string? MessageType { get; set; }

    public string? MessageBody { get; set; }

    public string? ContextMessageId { get; set; }

    public string? ContextFrom { get; set; }

    public string? SenderName { get; set; }

    public string? RawCallback { get; set; }

    public DateTime? CreatedAt { get; set; }

    public bool? BDel { get; set; }
}
