using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class TrTransCustomerBill
{
    public int Lid { get; set; }

    public int? BillPostingId { get; set; }

    public int RateId { get; set; }

    public int TransReqId { get; set; }

    public int TransporterId { get; set; }

    public int? JobId { get; set; }

    public string? JobRefNo { get; set; }

    public string? FromCity { get; set; }

    public string? ToCity { get; set; }

    public decimal? FreightAmount { get; set; }

    public decimal? DetentionAmount { get; set; }

    public decimal? VaraiExpense { get; set; }

    public decimal? EmptyContRecptCharges { get; set; }

    public decimal? TollCharges { get; set; }

    public decimal? OtherCharges { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public int? UpdUser { get; set; }

    public DateTime? UpdDate { get; set; }

    public bool BDel { get; set; }
}
