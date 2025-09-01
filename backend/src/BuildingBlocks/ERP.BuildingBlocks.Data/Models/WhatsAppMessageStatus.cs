using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class WhatsAppMessageStatus
{
    public long Id { get; set; }

    public string? MessageId { get; set; }

    public string? RequestStatus { get; set; }

    public string? DeliveryStatus { get; set; }

    public string? RecipientId { get; set; }

    public string? MobileNos { get; set; }

    public double? CountDeducted { get; set; }

    public string? PricingCategory { get; set; }

    public string? PricingModel { get; set; }

    public bool? Billable { get; set; }

    public long? RequestTimestamp { get; set; }

    public long? DeliveryTimestamp { get; set; }

    public string? ConversationId { get; set; }

    public string? OriginType { get; set; }

    public string? RawRequest { get; set; }

    public string? RawCallback { get; set; }

    public DateTime? CreatedAt { get; set; }

    public bool? BDel { get; set; }
}
