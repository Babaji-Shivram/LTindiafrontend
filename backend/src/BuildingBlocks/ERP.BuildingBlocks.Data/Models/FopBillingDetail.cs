using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class FopBillingDetail
{
    public long Lid { get; set; }

    public long EnqId { get; set; }

    public bool? FileReceiveStatus { get; set; }

    public DateOnly? FileReceivedDate { get; set; }

    public int? FileReceivedBy { get; set; }

    public string? BillNumber { get; set; }

    public DateOnly? BillDate { get; set; }

    public decimal? BillAmount { get; set; }

    public bool? BillingCompleted { get; set; }

    public DateOnly? BillingCompletedDate { get; set; }

    public string? AgentName { get; set; }

    public string? InvoiceNo { get; set; }

    public DateTime? InvoiceDate { get; set; }

    public decimal? InvoiceAmount { get; set; }

    public int? InvoiceCurrencyId { get; set; }

    public bool? AgentInvoiceStatus { get; set; }

    public DateOnly? BillDispatchDate { get; set; }

    public string? Remark { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public int? UpdUser { get; set; }

    public DateTime? UpdDate { get; set; }

    public bool BDel { get; set; }
}
