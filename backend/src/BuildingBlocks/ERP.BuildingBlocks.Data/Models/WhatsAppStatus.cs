using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class WhatsAppStatus
{
    public int LId { get; set; }

    public string? MessageId { get; set; }

    public string? Status { get; set; }

    public DateTime? Timestamp { get; set; }

    public string? RecipientId { get; set; }

    public int? ErrorCode { get; set; }

    public string? ErrorTitle { get; set; }

    public string? ErrorMessage { get; set; }

    public string? ErrorDetails { get; set; }

    public string? RawJson { get; set; }

    public DateTime CreatedOn { get; set; }

    public bool? BDel { get; set; }
}
