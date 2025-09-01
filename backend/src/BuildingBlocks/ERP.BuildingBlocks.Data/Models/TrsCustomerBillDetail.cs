using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class TrsCustomerBillDetail
{
    public int Lid { get; set; }

    public int TransReqId { get; set; }

    public int BillId { get; set; }

    public int RateId { get; set; }

    public int TransporterId { get; set; }

    public string? VehicleNo { get; set; }

    public decimal FreightCharges { get; set; }

    public decimal DetentionCharges { get; set; }

    public decimal EmptyCharges { get; set; }

    public decimal WaraiCharges { get; set; }

    public decimal? TollCharges { get; set; }

    public decimal? UnionCharges { get; set; }

    public string? FreightChallanNo { get; set; }

    public DateTime? FreightChallanDate { get; set; }

    public string? DestFrom { get; set; }

    public string? DestTo { get; set; }

    public string? Remark { get; set; }

    public DateTime DtDate { get; set; }

    public int LUser { get; set; }

    public bool Bdel { get; set; }

    public int? UpdUser { get; set; }

    public DateTime? UpdDate { get; set; }
}
