using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsJobDeliveryWarehouse
{
    public int LId { get; set; }

    public int JobId { get; set; }

    public int? AlertId { get; set; }

    public int? ContainerId { get; set; }

    public int? NoOfPackages { get; set; }

    public string? VehicleNo { get; set; }

    public int? VehicleType { get; set; }

    public DateOnly? VehicleRcvdDate { get; set; }

    public string? TransporterName { get; set; }

    public int? TransporterId { get; set; }

    public bool? TransportByBabaji { get; set; }

    public long? ConsolidateId { get; set; }

    public string? Lrno { get; set; }

    public DateOnly? Lrdate { get; set; }

    public string? DeliveryPoint { get; set; }

    public string? DeliveryPointOld { get; set; }

    public DateOnly? DispatchDate { get; set; }

    public string? RoadPermitNo { get; set; }

    public DateOnly? RoadPermitDate { get; set; }

    public string? PodattachmentPath { get; set; }

    public string? NformNo { get; set; }

    public DateOnly? NformDate { get; set; }

    public DateOnly? NclosingDate { get; set; }

    public string? SformNo { get; set; }

    public DateOnly? SformDate { get; set; }

    public DateOnly? SclosingDate { get; set; }

    public decimal? OctroiAmount { get; set; }

    public string? OctroiReceiptNo { get; set; }

    public DateOnly? OctroiPaidDate { get; set; }

    public string? BabajiChallanNo { get; set; }

    public DateOnly? BabajiChallanDate { get; set; }

    public string? BabajiChallanCopy { get; set; }

    public bool? IsDamaged { get; set; }

    public string? DamagedImage { get; set; }

    public int? LabourTypeId { get; set; }

    public string? DriverName { get; set; }

    public string? DriverPhone { get; set; }

    public string? Remark { get; set; }

    public bool MailSent { get; set; }

    public bool Smssent { get; set; }

    public bool? IsMobile { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public int? UpdUser { get; set; }

    public DateTime? UpdDate { get; set; }

    public bool BDel { get; set; }
}
