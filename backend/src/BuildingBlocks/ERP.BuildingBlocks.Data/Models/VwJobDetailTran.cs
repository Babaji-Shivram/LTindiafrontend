using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class VwJobDetailTran
{
    public int AlertId { get; set; }

    public int JobId { get; set; }

    public string? BsJobNo { get; set; }

    public bool ClearedStatus { get; set; }

    public int FinYear { get; set; }

    public int? CustomerId { get; set; }

    public string TransportationBy { get; set; } = null!;

    public int? DivisionId { get; set; }

    public int? PlantId { get; set; }

    public int? BabajiBranchid { get; set; }

    public int? Port { get; set; }

    public string? PortOfLoading { get; set; }

    public string? CustomerRefNo { get; set; }

    public string? DeliverdContainerNo { get; set; }

    public string? WarehouseContainerNo { get; set; }

    public string Consignee { get; set; } = null!;

    public string PortOfDischarge { get; set; } = null!;

    public string Mode { get; set; } = null!;

    public string? JobCreatedDate { get; set; }

    public string? BoeType { get; set; }

    public string? HssSellerName { get; set; }

    public string? IgmNo { get; set; }

    public string? ShortDescription { get; set; }

    public string? Supplier { get; set; }

    public string? ShippingAirline { get; set; }

    public int? NoOfPkgs { get; set; }

    public int? BDeliveryStatus { get; set; }

    public string ContainerType { get; set; } = null!;

    public string DeliveryStatus { get; set; } = null!;

    public decimal? GrossWeight { get; set; }

    public string? BillOfEntryNo { get; set; }

    public string? BillOfEntryDate { get; set; }

    public string? BeGroup { get; set; }

    public decimal? RdAmount { get; set; }

    public decimal? FrankingAmount { get; set; }

    public string? CargoMovedTo { get; set; }

    public string? WarehouseName { get; set; }

    public DateOnly? DsroutOfchargeDate { get; set; }

    public string? BondNocNumber { get; set; }

    public string? ChecklistAuditRequestedBy { get; set; }

    public string? ChecklistAuditApprovedBy { get; set; }

    public string? CustomerChecklistRequestedBy { get; set; }

    public string? CustomerChecklistApprovedBy { get; set; }

    public string? PreAlertDate { get; set; }

    public string? JobCreationDate { get; set; }

    public string? Eta { get; set; }

    public string? Ata { get; set; }

    public string? OutOfChargeDate { get; set; }

    public string? FrankingDate { get; set; }

    public string? DeliveryPlanningDate { get; set; }

    public string? DeliveryDate { get; set; }

    public string? TruckRequestDate { get; set; }

    public string? LastDispatchDate { get; set; }

    public string? DispatchDate { get; set; }

    public string? TransporterName { get; set; }

    public string? CargoDeliveredDate { get; set; }

    public string? DeliveryPoint { get; set; }

    public string? VehicleNo { get; set; }

    public string? SFormNo { get; set; }

    public string? DispatchUser { get; set; }

    public string? VehicleType { get; set; }

    public string? BabajiChallanNo { get; set; }
}
