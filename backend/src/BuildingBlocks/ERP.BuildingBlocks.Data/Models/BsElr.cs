using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsElr
{
    public int Lid { get; set; }

    public int? JobId { get; set; }

    public string? JobRefNo { get; set; }

    public int? VehicleId { get; set; }

    public string? VehicalNo { get; set; }

    public string? VehicalType { get; set; }

    public string? Elrno { get; set; }

    public DateTime? Elrdate { get; set; }

    public string? EwayBillNo { get; set; }

    public string? Mawbno { get; set; }

    public string? ConsigneeName { get; set; }

    public string? ConsigneeGstin { get; set; }

    public int? DeliveryTypeId { get; set; }

    public int? NoOfPackages { get; set; }

    public string? ContainerNo { get; set; }

    public string? DeliveryAddress { get; set; }

    public string? FromAddress { get; set; }

    public string? ToAddress { get; set; }

    public string? StartLatitude { get; set; }

    public string? StartLongitude { get; set; }

    public string? EndLatitude { get; set; }

    public string? EndLongitude { get; set; }

    public string? ReceiversName { get; set; }

    public DateTime? ReceivingDate { get; set; }

    public string? ReceiversRemark { get; set; }

    public string? ReceiverSignature { get; set; }

    public string? ReceiversPhoto { get; set; }

    public string? ReceiversGoodsPhoto { get; set; }

    public string? ElrfileName { get; set; }

    public string? ElrdocPath { get; set; }

    public int? LUser { get; set; }

    public DateTime? DtDate { get; set; }

    public int? UpdUser { get; set; }

    public DateTime? UpdDate { get; set; }

    public bool? BDel { get; set; }
}
