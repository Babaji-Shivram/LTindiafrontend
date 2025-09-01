using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class TrTransBillDetail
{
    public int Lid { get; set; }

    public int TransReqId { get; set; }

    public int TransporterId { get; set; }

    public int? PaymentId { get; set; }

    public int TransitDays { get; set; }

    public DateTime BillSubmitDate { get; set; }

    public string? BillNumber { get; set; }

    public DateTime? BillDate { get; set; }

    public decimal? BillAmount { get; set; }

    public decimal? DetentionAmount { get; set; }

    public decimal? VaraiAmount { get; set; }

    public decimal? EmptyContRcptCharges { get; set; }

    public decimal? TollCharges { get; set; }

    public decimal? OtherCharges { get; set; }

    public decimal? TotalAmount { get; set; }

    public string? BillPersonName { get; set; }

    public int? LStatus { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public bool BDel { get; set; }

    public int? UpdUser { get; set; }

    public DateTime? UpdDate { get; set; }

    public bool? IsValid { get; set; }

    public int? IsApproved { get; set; }

    public decimal? ApprovedAmount { get; set; }

    public string? Justification { get; set; }

    public bool IsConsolidated { get; set; }

    public int? ConsolidateId { get; set; }

    public string? DocName { get; set; }

    public string? DocPath { get; set; }
}
