using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class SezInvoiceDetail
{
    public int InvId { get; set; }

    public int JobId { get; set; }

    public int JobType { get; set; }

    public string? InvNo { get; set; }

    public DateOnly? InvDate { get; set; }

    public decimal? InvValue { get; set; }

    public int? Term { get; set; }

    public string? Description { get; set; }

    public decimal? RemainingQty { get; set; }

    public decimal? Quantity { get; set; }

    public decimal? ItemPrice { get; set; }

    public decimal? ProductValue { get; set; }

    public decimal? Cth { get; set; }

    public string? ItemType { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public int? UpdUser { get; set; }

    public DateTime? UpdDate { get; set; }

    public bool BDel { get; set; }
}
