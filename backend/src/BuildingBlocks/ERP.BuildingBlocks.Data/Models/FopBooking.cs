using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class FopBooking
{
    public int LId { get; set; }

    public string? FrjobNo { get; set; }

    public int EnqId { get; set; }

    public int? LStatusDeleted { get; set; }

    public string? BookingDetails { get; set; }

    public DateTime? BookingDate { get; set; }

    public string? InvoiceNo { get; set; }

    public DateTime? InvoiceDate { get; set; }

    public string? Ponumber { get; set; }

    public string? ShippingLineName { get; set; }

    public bool? BookingStatus { get; set; }

    public bool? AgentPreAlertStatus { get; set; }

    public decimal? DebitNoteAmount { get; set; }

    public string? DebitNoteRemark { get; set; }

    public bool? CustPreAlertStatus { get; set; }

    public bool? Canstatus { get; set; }

    public bool? Dostatus { get; set; }

    public bool? BillingAdviceStatus { get; set; }

    public bool? AgentInvoiceStatus { get; set; }

    public bool? ExpOperationStatus { get; set; }

    public bool? ExpVgmstatus { get; set; }

    public bool? ExpPreShipDocStatus { get; set; }

    public bool? ExpPendingBookingStatus { get; set; }

    public bool? ExpContainerPlanningStatus { get; set; }

    public bool? ExpReleasedShippingOrderStatus { get; set; }

    public bool? ExpUnderPortStatus { get; set; }

    public bool? ExpBlreleasedStatus { get; set; }

    public bool? ExpPreAlertStatus { get; set; }

    public bool? ExpOnboardStatus { get; set; }

    public string? Remark { get; set; }

    public int? DeliveryStatus { get; set; }

    public int? FinYear { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public int? UpdUser { get; set; }

    public DateTime? UpdDate { get; set; }

    public bool BDel { get; set; }

    public virtual ICollection<BsTruncatePreventKey> BsTruncatePreventKeys { get; set; } = new List<BsTruncatePreventKey>();
}
