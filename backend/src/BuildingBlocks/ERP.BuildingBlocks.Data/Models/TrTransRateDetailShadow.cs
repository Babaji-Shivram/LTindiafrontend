using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class TrTransRateDetailShadow
{
    public long AuditId { get; set; }

    public int Lid { get; set; }

    public int TransReqId { get; set; }

    public int TransporterId { get; set; }

    public string? City { get; set; }

    public int? VehicleId { get; set; }

    public string VehicleNo { get; set; } = null!;

    public int? VehicleType { get; set; }

    public string? MemoAttachment { get; set; }

    public decimal? Rate { get; set; }

    public decimal? Advance { get; set; }

    public decimal? AdvanceAmount { get; set; }

    public decimal? MarketBillingRate { get; set; }

    public string? Lrno { get; set; }

    public DateOnly? Lrdate { get; set; }

    public string? ChallanNo { get; set; }

    public DateOnly? ChallanDate { get; set; }

    public int? FundRequestId { get; set; }

    public decimal? FreightAmount { get; set; }

    public decimal? DetentionAmount { get; set; }

    public decimal? VaraiExpense { get; set; }

    public decimal? EmptyContRecptCharges { get; set; }

    public decimal? TollCharges { get; set; }

    public decimal? OtherCharges { get; set; }

    public bool Delivered { get; set; }

    public int? DriverId { get; set; }

    public string? DriverName { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public int? UpdUser { get; set; }

    public DateTime? UpdDate { get; set; }

    public bool BDel { get; set; }

    public decimal? ContractPrice { get; set; }

    public decimal? SellingPrice { get; set; }

    public string? EmailAttachment { get; set; }

    public string? ContractAttachment { get; set; }

    public string AuditAction { get; set; } = null!;

    public DateTime AuditDate { get; set; }

    public string AuditUser { get; set; } = null!;

    public string? AuditApp { get; set; }
}
