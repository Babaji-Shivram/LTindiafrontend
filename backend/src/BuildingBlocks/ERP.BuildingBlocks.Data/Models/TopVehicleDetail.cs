using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class TopVehicleDetail
{
    public long Lid { get; set; }

    public int JobDeliveryId { get; set; }

    public int JobId { get; set; }

    public string? TransporterName { get; set; }

    public int? TransporterId { get; set; }

    public int? Packages { get; set; }

    public int? ContainerId { get; set; }

    public string VehicleNo { get; set; } = null!;

    public int? VehicleType { get; set; }

    public string? DeliveryFrom { get; set; }

    public string? DeliveryTo { get; set; }

    public int? DeliveryType { get; set; }

    public DateOnly? DispatchDate { get; set; }

    public DateOnly DeliveryDate { get; set; }

    public decimal TpfrightRate { get; set; }

    public DateOnly ReportDate { get; set; }

    public DateOnly UnloadDate { get; set; }

    public int? DetentionDays { get; set; }

    public decimal? DetentionCharges { get; set; }

    public decimal? OtherCharges { get; set; }

    public decimal? WaraiCharges { get; set; }

    public decimal? EmptyOffLoadingCharges { get; set; }

    public decimal? TempoUnionCharges { get; set; }

    public decimal? Total { get; set; }

    public string? Remarks { get; set; }

    public DateOnly? EmptyContReturnDate { get; set; }

    public string LrCopiesDocPath { get; set; } = null!;

    public string ReceiptDocPath { get; set; } = null!;

    public int? BillingConsolidatedId { get; set; }

    public bool? IsValidBill { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public DateTime? UpdDate { get; set; }

    public bool BDel { get; set; }

    public int BillStatusId { get; set; }

    public int? UpdUser { get; set; }
}
