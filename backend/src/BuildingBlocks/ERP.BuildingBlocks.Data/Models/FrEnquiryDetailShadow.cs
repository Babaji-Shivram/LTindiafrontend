using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class FrEnquiryDetailShadow
{
    public long AuditId { get; set; }

    public int LId { get; set; }

    public int EnqId { get; set; }

    public string? Shipper { get; set; }

    public string? Consignee { get; set; }

    public int? ConsigneeId { get; set; }

    public int? ShipperId { get; set; }

    public int? CountryId { get; set; }

    public int? PortOfLoadingId { get; set; }

    public int? PortOfDischargeId { get; set; }

    public int? TermsId { get; set; }

    public string? AgentName { get; set; }

    public int? AgentCompId { get; set; }

    public int? ContainerType { get; set; }

    public string? ContainerSubType { get; set; }

    public int? CountOf20 { get; set; }

    public int? CountOf40 { get; set; }

    public decimal? Lclvolume { get; set; }

    public int? NoOfPackages { get; set; }

    public int? PackageTypeId { get; set; }

    public decimal? GrossWeight { get; set; }

    public decimal? ChargeableWeight { get; set; }

    public bool? IsDangerousGood { get; set; }

    public string? CargoDescription { get; set; }

    public int? BranchId { get; set; }

    public string? ConsigneeAddress { get; set; }

    public int? ConsigneeStateId { get; set; }

    public string? ConsigneeGstn { get; set; }

    public string? ShipperAddress { get; set; }

    public string? Remarks { get; set; }

    public bool BDel { get; set; }

    public DateTime DtDate { get; set; }

    public int? UpdUser { get; set; }

    public int LUser { get; set; }

    public DateTime? UpdDate { get; set; }

    public bool? Iec { get; set; }

    public string? ShipperPinCode { get; set; }

    public string? Commodity { get; set; }

    public decimal? Quantity { get; set; }

    public decimal? DimensionLength { get; set; }

    public decimal? DimensionWidth { get; set; }

    public decimal? DimensionHeight { get; set; }

    public string? ProductLink { get; set; }

    public decimal? HsCode { get; set; }

    public decimal? InvoiceValue { get; set; }

    public string? DeliveryAddress { get; set; }

    public string? DeliveryAddPincode { get; set; }

    public string AuditAction { get; set; } = null!;

    public DateTime AuditDate { get; set; }

    public string AuditUser { get; set; } = null!;

    public string? AuditApp { get; set; }
}
