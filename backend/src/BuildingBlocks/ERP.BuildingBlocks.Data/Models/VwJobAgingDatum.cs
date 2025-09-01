using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class VwJobAgingDatum
{
    public string? BsJobNo { get; set; }

    public string? InbondJob { get; set; }

    public string? PortOfLoading { get; set; }

    public string Customer { get; set; } = null!;

    public string? CustomerRefNo { get; set; }

    public string JobUser { get; set; } = null!;

    public string? IgmUser { get; set; }

    public string Consignee { get; set; } = null!;

    public string? ChecklistAuditRequestedBy { get; set; }

    public string? ChecklistAuditApprovedBy { get; set; }

    public string? DoUser { get; set; }

    public string? NotingUser { get; set; }

    public string? DutyUser { get; set; }

    public string? FirstCheckUser { get; set; }

    public string? PassingUser { get; set; }

    public string? AdcPhoUser { get; set; }

    public string? DeliveryPlanningUser { get; set; }

    public string? OutOfChargeUser { get; set; }

    public string PortOfDischarge { get; set; } = null!;

    public string Mode { get; set; } = null!;

    public decimal? AssessableValue { get; set; }

    public string? JobType { get; set; }

    public string? JobPriority { get; set; }

    public string? BoeType { get; set; }

    public string? HssSellerName { get; set; }

    public string? IgmNo { get; set; }

    public string? LandIgmNo { get; set; }

    public string? ShortDescription { get; set; }

    public string? Supplier { get; set; }

    public string? ShippingAirline { get; set; }

    public string? ConsolAgent { get; set; }

    public string? MblMawblNo { get; set; }

    public string? HblHawblNo { get; set; }

    public int? FreeDays { get; set; }

    public string? DoPaymentType { get; set; }

    public string? VesselFlightName { get; set; }

    public int? NoOfPkgs { get; set; }

    public decimal? GrossWeight { get; set; }

    public string ContainerType { get; set; } = null!;

    public string DeliveryStatus { get; set; } = null!;

    public string IgmStatus { get; set; } = null!;

    public string DoStatus { get; set; } = null!;

    public string FirstCheckRequired { get; set; } = null!;

    public decimal? DutyAmount { get; set; }

    public string? DutyPaymentType { get; set; }

    public string? DutyChallanNo { get; set; }

    public decimal? IgstAmount { get; set; }

    public decimal? InterestAmount { get; set; }

    public decimal? FinePanaltyAmount { get; set; }

    public string? BillOfEntryNo { get; set; }

    public string? BillOfEntryDate { get; set; }

    public string? BeGroup { get; set; }

    public string RmsNonRms { get; set; } = null!;

    public string? CargoMovedTo { get; set; }

    public string? WarehouseName { get; set; }

    public string OctroiApplicable { get; set; } = null!;

    public string SformApplicable { get; set; } = null!;

    public string NformApplicable { get; set; } = null!;

    public string RoadPermitApplicable { get; set; } = null!;

    public string? PreAlertDate { get; set; }

    public string? JobCreationDate { get; set; }

    public string? Eta { get; set; }

    public string? Ata { get; set; }

    public string? IgmCreationDate { get; set; }

    public string? ChecklistRequestDate { get; set; }

    public string? ChecklistAuditDate { get; set; }

    public string? DoUpdateDate { get; set; }

    public string? NotingUpdateDate { get; set; }

    public string? DutyRequestDate { get; set; }

    public string? DutyPaidDate { get; set; }

    public string? FirstCheckUpdateDate { get; set; }

    public string? PassingUpdateDate { get; set; }

    public string? AdcPhoUpdateDate { get; set; }

    public string? IgmDate { get; set; }

    public string? LandIgmDate { get; set; }

    public string? CfsDate { get; set; }

    public string? InwardDate { get; set; }

    public string? MblMawblDate { get; set; }

    public string? HblHawblDate { get; set; }

    public string? DutyChallanDate { get; set; }

    public string? BillOfEntryPassingDate { get; set; }

    public string? AppraisingDate { get; set; }

    public string? ConsoleDoReceivedDate { get; set; }

    public string? FinalDoReceived { get; set; }

    public string? EmptyValidityDate { get; set; }

    public string? CargoExaminationDate { get; set; }

    public string? DateOfDispatchFromCfs { get; set; }

    public string? OutOfChargeDate { get; set; }

    public string? FrankingDate { get; set; }

    public string? DeliveryPlanningDate { get; set; }

    public string? OblReceivedDate { get; set; }

    public string? AdcWithdrawnDate { get; set; }

    public string? AdcExamDate { get; set; }

    public string? AdcNocDate { get; set; }

    public string? PhoAppointDate { get; set; }

    public string? PhoLabTestDate { get; set; }

    public string? PhoPaymentDate { get; set; }

    public string? PhoReportDate { get; set; }

    public string? PhoScrutinyDate { get; set; }

    public string? PhoSubmitDate { get; set; }

    public string? PhoWithdrawnDate { get; set; }

    public string? TruckRequestDate { get; set; }

    public string? DispatchDate { get; set; }

    public string? InvoiceDate { get; set; }

    public string? FirstAppraisingDate { get; set; }

    public string? FirstAssessmentDate { get; set; }

    public string? ForwardAppraisingDate { get; set; }

    public string? CeInspectionDate { get; set; }

    public string? PcaBackOfficeDate { get; set; }

    public string? DoBranch { get; set; }

    public string? EmptyYardName { get; set; }

    public int? SecurityDeposit { get; set; }

    public string? DeliveryDestination { get; set; }

    public string? DeliveryAddress { get; set; }

    public string? DeliveryInstruction { get; set; }

    public string TransportationBy { get; set; } = null!;

    public string? ChecklistStatus { get; set; }

    public string? DutyStatus { get; set; }

    public string? CfsName { get; set; }

    public int? CountOfContainerNo { get; set; }

    public int? SumOf20 { get; set; }

    public int? SumOf40 { get; set; }

    public string? DeliveryType { get; set; }

    public string CustomerDivisionBranch { get; set; } = null!;

    public string CustomerPlant { get; set; } = null!;

    public string BabajiBranch { get; set; } = null!;

    public string? InvoiceNo { get; set; }

    public string? TermsOfInvoice { get; set; }

    public string? InvoiceValue { get; set; }

    public string? InvoiceProductDescription { get; set; }

    public string? InvoiceUnitOfProduct { get; set; }

    public string? InvoiceUnitPrice { get; set; }

    public string? InvoiceCurrency { get; set; }

    public string? InvoiceQuantity { get; set; }
}
