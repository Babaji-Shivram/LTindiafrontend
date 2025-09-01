using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class TrVehicleSellingDetail
{
    public int Lid { get; set; }

    public int TransReqId { get; set; }

    public int? RateId { get; set; }

    public decimal? FreightRate { get; set; }

    public decimal? MarketBillingRate { get; set; }

    public decimal? DetentionAmount { get; set; }

    public decimal? VaraiExpense { get; set; }

    public decimal? EmptyContRecptCharges { get; set; }

    public decimal? TollCharges { get; set; }

    public decimal? OtherCharges { get; set; }

    public decimal? TotalAmount { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public int? UpdUser { get; set; }

    public DateTime? UpdDate { get; set; }

    public bool BDel { get; set; }

    public int? DetetionDocId { get; set; }

    public int? VaraiDocId { get; set; }

    public int? EmptyContDocId { get; set; }

    public int? TollDocId { get; set; }

    public int? OtherDocId { get; set; }

    public string? Remark { get; set; }
}
