using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class WhatsAppCallbackError
{
    public int EntryId { get; set; }

    public string? CallbackId { get; set; }

    public int? ErrorCode { get; set; }

    public string? Title { get; set; }

    public string? Message { get; set; }

    public string? Details { get; set; }

    public string? RawCallback { get; set; }

    public DateTime? ReceivedAt { get; set; }

    public bool? BDel { get; set; }
}
