using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class VwExJobDetail
{
    public int JobId { get; set; }

    public string BsJobNo { get; set; } = null!;

    public string? Customer { get; set; }

    public string? Consignee { get; set; }

    public string? Mode { get; set; }

    public string? PortOfLoading { get; set; }

    public string? PortOfDischarge { get; set; }

    public string? CustomerRefNo { get; set; }

    public string? CustomerDivisionBranch { get; set; }

    public string? CustomerPlant { get; set; }

    public string? BabajiBranch { get; set; }

    public string? Shipper { get; set; }

    public string? ConsignmentCountry { get; set; }

    public string? DestinationCountry { get; set; }

    public string? Buyer { get; set; }

    public string? ProductDescription { get; set; }

    public int? NoOfPkgs { get; set; }

    public string? PackageType { get; set; }

    public string? ShippingBillType { get; set; }

    public string? ContainerLoaded { get; set; }

    public string? SealNo { get; set; }

    public decimal? GrossWt { get; set; }

    public decimal? NetWt { get; set; }

    public string TransportBy { get; set; } = null!;

    public string? PickUpFrom { get; set; }

    public string? Destination { get; set; }

    public int? ExportTypeId { get; set; }

    public string? TypeOfExport { get; set; }

    public string? FobValue { get; set; }

    public string? CifValue { get; set; }

    public string? ChecklistStatus { get; set; }

    public string? CustomerChecklistApproveDate { get; set; }

    public string? CustomerChecklistRequestedDate { get; set; }

    public string? CustomerChecklistApprovedBy { get; set; }

    public string? CustomerChecklistRequestedBy { get; set; }

    public string? SBillNo { get; set; }

    public string? SBillDate { get; set; }

    public string MarkAppraising { get; set; } = null!;

    public string? PassingDate { get; set; }

    public string? RegistrationDate { get; set; }

    public string? ExamineDate { get; set; }

    public string? ExamineReportDate { get; set; }

    public string? SuperintendentLeoDate { get; set; }

    public string? DocumentHandOverToShippingLineDate { get; set; }

    public string? InformedToFreightForwarderDate { get; set; }

    public string? ForwarderPersonName { get; set; }

    public string? InvoiceNo { get; set; }

    public string? InvoiceDate { get; set; }

    public string? InvoiceValue { get; set; }

    public string? ShipmentTerm { get; set; }

    public string? DbkAmount { get; set; }

    public string? LicenseNo { get; set; }

    public DateOnly? LicenseDate { get; set; }

    public string? FreightAmount { get; set; }

    public string? InsuranceAmount { get; set; }

    public DateTime JobCreatedDate { get; set; }

    public int FinYear { get; set; }

    public int? CustomerId { get; set; }

    public int? BabajiBranchId { get; set; }

    public bool? BackOfficeStatus { get; set; }

    public string? ChecklistAuditRequestedBy { get; set; }

    public string? ChecklistAuditRequestedDate { get; set; }

    public string? Dimension { get; set; }

    public string? MblMawblNo { get; set; }

    public string? MblMawblDate { get; set; }

    public string? HblHawblNo { get; set; }

    public string? HblHawblDate { get; set; }

    public string? PickUpDate { get; set; }

    public string? PickUpBy { get; set; }

    public string? PickUpByPhone { get; set; }

    public string? TransporterHandOverDate { get; set; }

    public string? Form13Date { get; set; }

    public string? ContainerGetInDate { get; set; }

    public string ContainerType { get; set; } = null!;

    public int? SumOf20 { get; set; }

    public int? SumOf40 { get; set; }

    public int? SumOfLcl { get; set; }

    public string? ContainerNo { get; set; }

    public string? ContainerTypes { get; set; }

    public string? ContainerSize { get; set; }
}
