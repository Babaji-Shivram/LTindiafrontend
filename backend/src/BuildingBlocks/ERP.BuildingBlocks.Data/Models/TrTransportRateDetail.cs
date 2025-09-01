using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class TrTransportRateDetail
{
    public long LId { get; set; }

    public long? TransReqId { get; set; }

    public string? VehicleNo { get; set; }

    public int? VehicleType { get; set; }

    public int? Packages { get; set; }

    public string? ContainerNo { get; set; }

    public int? Con20 { get; set; }

    public int? Con40 { get; set; }

    public string? DeliveryFrom { get; set; }

    public string? DeliveryTo { get; set; }

    public DateTime? DispatchDate { get; set; }

    public DateTime? DeliveryDate { get; set; }

    public string? Transporter { get; set; }

    public int? TransporterId { get; set; }

    public int? TransportAmount { get; set; }

    public int? ApprovedAmount { get; set; }

    public int? ApprovedBy { get; set; }

    public string? ApprovedRemark { get; set; }

    public bool IsApproved { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public bool BDel { get; set; }

    public decimal? VaraiAmount { get; set; }

    public decimal? DetentionAmount { get; set; }

    public decimal? EmptyContRcptCharges { get; set; }
}
