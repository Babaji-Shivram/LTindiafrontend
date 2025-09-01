using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class VwjobDetailforBillingTurnaround
{
    public int AlertId { get; set; }

    public int JobId { get; set; }

    public string? BsJobNo { get; set; }

    public string? InbondJob { get; set; }

    public string? DocumentsReceivedDate { get; set; }

    public int ClearedStatus { get; set; }

    public int? DivisionId { get; set; }

    public int? PlantId { get; set; }

    public int? BabajiBranchId { get; set; }

    public int? Port { get; set; }

    public string? PortOfLoading { get; set; }

    public string? CustomerRefNo { get; set; }

    public string? CountryOfOrigin { get; set; }

    public string? PortCode { get; set; }

    public string? Kam { get; set; }

    public string JobUser { get; set; } = null!;

    public string? IgmUser { get; set; }

    public string? NotingUser { get; set; }

    public string? Consignee { get; set; }

    public string PortOfDischarge { get; set; } = null!;

    public string Mode { get; set; } = null!;

    public string? JobCreatedDate { get; set; }

    public decimal? AssessableValue { get; set; }

    public string? JobRemark { get; set; }

    public string? JobType { get; set; }

    public string? JobPriority { get; set; }

    public int? FinYear { get; set; }

    public string? BoeType { get; set; }

    public string? HssSellerName { get; set; }

    public string? IgmNo { get; set; }

    public string? ShortDescription { get; set; }

    public string? Supplier { get; set; }

    public string? ShippingAirline { get; set; }

    public string? ConsolAgent { get; set; }

    public string? LandIgmNo { get; set; }

    public string? IgmRemark { get; set; }

    public string? IgmItem { get; set; }

    public string? IgmSubItem { get; set; }

    public string? IgmSubItem2 { get; set; }

    public string? IgmSubItem3 { get; set; }

    public string? MblMawblNo { get; set; }

    public string? HblHawblNo { get; set; }

    public string? IgmNo2 { get; set; }

    public string? IgmNo3 { get; set; }

    public int? FreeDays { get; set; }

    public string? DoPaymentType { get; set; }

    public string? VesselFlightName { get; set; }

    public int? NoOfPkgs { get; set; }

    public int? BDeliveryStatus { get; set; }

    public string ContainerType { get; set; } = null!;

    public string DeliveryStatus { get; set; } = null!;

    public string IgmStatus { get; set; } = null!;

    public string DoStatus { get; set; } = null!;

    public string FirstCheckRequired { get; set; } = null!;

    public double? GrossWeight { get; set; }

    public decimal? DutyAmount { get; set; }

    public decimal? BcdAmount { get; set; }

    public decimal? SocialSurchargeAmount { get; set; }

    public decimal? DutyPaid { get; set; }

    public string? DutyRemark { get; set; }

    public string? DutyPaymentType { get; set; }

    public string? DutyChallanNo { get; set; }

    public decimal? DutyDebitAmount { get; set; }

    public decimal? IgstAmount { get; set; }

    public decimal? InterestAmount { get; set; }

    public decimal? DutyFineAmount { get; set; }

    public decimal? DutyPenaltyAmount { get; set; }

    public string? CurrentQueue { get; set; }

    public string? BillOfEntryNo { get; set; }

    public string? BillOfEntryDate { get; set; }

    public string? BeGroup { get; set; }

    public string? PriorBe { get; set; }

    public string? BeMode { get; set; }

    public string? FirstCheckStatus { get; set; }

    public string? IecNo { get; set; }

    public string RmsNonRms { get; set; } = null!;

    public decimal? RdAmount { get; set; }

    public decimal? FrankingAmount { get; set; }

    public string? CargoMovedTo { get; set; }

    public string OocFrom { get; set; } = null!;

    public string? WarehouseName { get; set; }

    public DateOnly? DsroutOfchargeDate { get; set; }

    public string? BondNocNumber { get; set; }

    public string? ChecklistAuditRequestedBy { get; set; }

    public string? ChecklistAuditApprovedBy { get; set; }

    public string? CustomerChecklistRequestedBy { get; set; }

    public string? CustomerChecklistApprovedBy { get; set; }

    public string? PreAlertDate { get; set; }

    public string? JobCreationDate { get; set; }

    public string? OblReceivedDate { get; set; }

    public string? BondNocDate { get; set; }

    public string? BondCompletedDate { get; set; }

    public string? ChecklistAuditRequestedDate { get; set; }

    public string? CustomerChecklistRequestedDate { get; set; }

    public string? MblMawblDate { get; set; }

    public string? HblHawblDate { get; set; }

    public string? IgmDate2 { get; set; }

    public string? IgmDate3 { get; set; }

    public string? LandIgmDate { get; set; }

    public string? IgmFollowUpDate { get; set; }

    public string? CfsDate { get; set; }

    public string? IgmDate { get; set; }

    public string? InwardDate { get; set; }

    public string? IgmUpdateDate { get; set; }

    public string? Eta { get; set; }

    public string? Ata { get; set; }

    public string? ChecklistRequestDate { get; set; }

    public string? ChecklistAuditDate { get; set; }

    public string? CustomerChecklistApproveDate { get; set; }

    public string? DutyRequestDate { get; set; }

    public string? DutyPaidDate { get; set; }

    public string? DutyChallanDate { get; set; }

    public string? BillOfEntryPassingDate { get; set; }

    public string? AppraisingDate { get; set; }

    public string? ConsoleDoReceivedDate { get; set; }

    public string? DoBlankChequeDate { get; set; }

    public string? FinalDoReceived { get; set; }

    public string? EmptyValidityDate { get; set; }

    public string? DoUpdateDate { get; set; }

    public string? ConsolDoProcessDate { get; set; }

    public string? FinalDoProcessDate { get; set; }

    public string? CargoExaminationDate { get; set; }

    public string? DateOfDispatchFromCfs { get; set; }

    public string? OutOfChargeDate { get; set; }

    public string? FrankingDate { get; set; }

    public string? DeliveryPlanningDate { get; set; }

    public string? DeliveryDate { get; set; }

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

    public string? LastDispatchDate { get; set; }

    public string? DispatchDate { get; set; }

    public string? CargoDeliveredDate { get; set; }

    public string? EmptyContRetrunDate { get; set; }

    public string? NFormDate { get; set; }

    public string? NClosingDate { get; set; }

    public string? OctroiPaidDate { get; set; }

    public string? SClosingDate { get; set; }

    public string? VehicleReceivedDate { get; set; }

    public string? SFormDate { get; set; }

    public string? RoadPermitDate { get; set; }

    public string? LrDate { get; set; }

    public string? BabajiChallanDate { get; set; }

    public string? InvoiceDate { get; set; }

    public string? FirstAppraisingDate { get; set; }

    public string? FirstAssessmentDate { get; set; }

    public string? ForwardAppraisingDate { get; set; }

    public string? CeInspectionDate { get; set; }

    public string? PcaBackOfficeDate { get; set; }

    public string? PcaDeliveredDate { get; set; }

    public string? PcaDispatchDate { get; set; }

    public string? PcaDispatchUpdateDate { get; set; }

    public string? DoPickupPersonName { get; set; }

    public string? DoBlankChequeNo { get; set; }

    public string? DoBranch { get; set; }

    public string? EmptyYardName { get; set; }

    public int? SecurityDeposit { get; set; }

    public string? DoRemark { get; set; }

    public string? DoUser { get; set; }

    public string? DoPlanningRemark { get; set; }

    public string? DeliveryDestination { get; set; }

    public string? DeliveryAddress { get; set; }

    public string? DeliveryInstruction { get; set; }

    public string TransportationBy { get; set; } = null!;

    public int? CustomerId { get; set; }

    public string? Customer { get; set; }

    public string? SchemeLicenceNo { get; set; }

    public string? SchemeLicenceType { get; set; }

    public string? ChecklistStatus { get; set; }

    public string? DutyStatus { get; set; }

    public string? CfsName { get; set; }

    public string? JobCurrentStatus { get; set; }

    public string ProgressReport { get; set; } = null!;

    public int? ProgressId { get; set; }

    public DateTime? ProgressDate { get; set; }

    public string? IncoTerms { get; set; }

    public int? CountOfContainerNo { get; set; }

    public int? SumOf20 { get; set; }

    public int? SumOf40 { get; set; }

    public int? SumOfLcl { get; set; }

    public string? DeliveryType { get; set; }

    public string CustomerDivisionBranch { get; set; } = null!;

    public string CustomerPlant { get; set; } = null!;

    public string BabajiBranch { get; set; } = null!;

    public string? MeasurementUnit { get; set; }

    public string? RoadPermitNo { get; set; }

    public string? NFormNo { get; set; }

    public decimal? OctroiAmount { get; set; }

    public string? OctroiReceiptNo { get; set; }

    public string? SFormNo { get; set; }

    public string? DispatchUser { get; set; }

    public string? BabajiChallanNo { get; set; }

    public string? CargoReceivedBy { get; set; }

    public string? TransporterName { get; set; }

    public string? DeliveryPoint { get; set; }

    public string? VehicleNo { get; set; }

    public string? LrNo { get; set; }

    public string? DeliverdContainerNo { get; set; }

    public string? VehicleType { get; set; }

    public string? InvoiceNo { get; set; }

    public string? TermsOfInvoice { get; set; }

    public string? InvoiceValue { get; set; }

    public string? InvoiceCurrency { get; set; }

    public string? ExchangeRate { get; set; }

    public string? InvoiceFreightCurrency { get; set; }

    public decimal? InvoiceFreightAmount { get; set; }

    public string? InvoiceMiscCurrency { get; set; }

    public decimal? InvoiceMiscAmount { get; set; }

    public string? InvoiceInsuranceCurrency { get; set; }

    public decimal? InvoiceInsuranceExRate { get; set; }

    public decimal? InvoiceInsuranceRate { get; set; }

    public string? PcaCarryingPerson { get; set; }

    public string? PcaCourierName { get; set; }

    public string? PcaDocketNo { get; set; }

    public string? PcaDocumentReceivedBy { get; set; }

    public string PcaDispatchFor { get; set; } = null!;

    public string PcaDeliveryType { get; set; } = null!;

    public int? FundProvisionAmount { get; set; }

    public string? BillingStatus { get; set; }

    public string BillingStatusRemark { get; set; } = null!;

    public string? BillingInstruction { get; set; }

    public DateTime? BillingAdvCompletedDate { get; set; }

    public string? BillingAdvCompletedBy { get; set; }

    public DateTime? BillingScrutinyReceivedDate { get; set; }

    public string? BillingScrutinyReceivedBy { get; set; }

    public string? FreightJobNo { get; set; }

    public DateTime? BillingScrutinyCompletedDate { get; set; }

    public string? BillingScrutinyCompletedBy { get; set; }

    public DateTime? DraftInvoiceReceivedDate { get; set; }

    public string? DraftInvoiceReceivedBy { get; set; }

    public DateTime? DraftInvoiceCompletedDate { get; set; }

    public string? DraftInvoiceCompletedBy { get; set; }

    public DateTime? DraftInvoDate { get; set; }

    public string? DraftInvoNo { get; set; }

    public string? ConsoildatedJobno { get; set; }

    public DateTime? DraftCheckReceivedDate { get; set; }

    public string? DraftCheckReceivedBy { get; set; }

    public string? DraftCheckTickCross { get; set; }

    public DateTime? DraftCheckCompletedDate { get; set; }

    public string? DraftCheckCompletedBy { get; set; }

    public DateTime? FinalTypeReceivedDate { get; set; }

    public string? FinalTypeReceivedBy { get; set; }

    public DateTime? FinalTypeCompletedDate { get; set; }

    public string? FinalTypeCompletedBy { get; set; }

    public string? FinalTypeInvoNo { get; set; }

    public DateTime? FinalTypeInvoDate { get; set; }

    public DateTime? FinalCheckReceivedDate { get; set; }

    public string? FinalCheckReceivedBy { get; set; }

    public string? FinalCheckTickCross { get; set; }

    public DateTime? FinalCheckCompletedDate { get; set; }

    public string? FinalCheckCompletedBy { get; set; }

    public DateTime? BillDispatchReceivedDate { get; set; }

    public string? BillDispatchReceivedBy { get; set; }

    public DateTime? BillDispatchCompletedDate { get; set; }

    public string? BillDispatchCompletedBy { get; set; }

    public DateTime? Followupdate { get; set; }

    public string? FollouwupRemark { get; set; }

    public string? LrDcType { get; set; }

    public DateTime? RejectedDate { get; set; }

    public string? RejectedBy { get; set; }

    public DateTime? RejectionCompletedDate { get; set; }

    public string? RejectionCompletedBy { get; set; }

    public string? RejectedStage { get; set; }

    public string? RejectReason { get; set; }

    public string? DeliveredDate { get; set; }

    public string? BillingDispatchDate { get; set; }

    public string? CourierName { get; set; }

    public string? DispatchDocketNo { get; set; }

    public string? DocumentsCarryingPersonName { get; set; }

    public string? DocumentsReceivedPersonName { get; set; }

    public string DispatchType { get; set; } = null!;

    public DateTime? MasterInvoiceDate { get; set; }

    public string? MasterInvoiceNo { get; set; }
}
