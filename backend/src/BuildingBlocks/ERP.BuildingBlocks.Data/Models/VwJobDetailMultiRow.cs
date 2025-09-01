using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class VwJobDetailMultiRow
{
    public int AlertId { get; set; }

    public int JobId { get; set; }

    public string? BsJobNo { get; set; }

    public string? DocumentsReceivedDate { get; set; }

    public int? DivisionId { get; set; }

    public int? PlantId { get; set; }

    public int? BabajiBranchid { get; set; }

    public string? CountryOfOrigin { get; set; }

    public string? PortCode { get; set; }

    public string? PortOfLoading { get; set; }

    public string? CustomerRefNo { get; set; }

    public string Consignee { get; set; } = null!;

    public string PortOfDischarge { get; set; } = null!;

    public string Mode { get; set; } = null!;

    public DateTime JobCreatedDate { get; set; }

    public DateOnly? OblReceivedDate { get; set; }

    public string? JobType { get; set; }

    public string? Priority { get; set; }

    public decimal? AssessableValue { get; set; }

    public int? FinYear { get; set; }

    public string? BoeType { get; set; }

    public string? HssSellerName { get; set; }

    public string? IgmNo { get; set; }

    public string? ProductDescription { get; set; }

    public string? Supplier { get; set; }

    public string? ShippingLine { get; set; }

    public string? FfName { get; set; }

    public string? IgmRemark { get; set; }

    public string? IgmItem { get; set; }

    public string? IgmSubItem { get; set; }

    public string? IgmSubItem2 { get; set; }

    public string? IgmSubItem3 { get; set; }

    public string? MblMawbNo { get; set; }

    public string? HblHawbNo { get; set; }

    public string? IgmNo2 { get; set; }

    public string? IgmNo3 { get; set; }

    public int? FreeDays { get; set; }

    public string? Vessel { get; set; }

    public int? CountOfContainerNo { get; set; }

    public int? NoOfPkgs { get; set; }

    public int? BDeliveryStatus { get; set; }

    public string ShipmentType { get; set; } = null!;

    public string DeliveryStatus { get; set; } = null!;

    public string IgmStatus { get; set; } = null!;

    public string DoStatus { get; set; } = null!;

    public string FirstCheckRequired { get; set; } = null!;

    public decimal? GrossWeight { get; set; }

    public decimal? DutyAmount { get; set; }

    public decimal? BcdAmount { get; set; }

    public decimal? SocialSurchargeAmount { get; set; }

    public decimal? DutyPaid { get; set; }

    public decimal? DutyDebitAmount { get; set; }

    public string? DutyRemark { get; set; }

    public string? DdChallanNo { get; set; }

    public string? DutyPaymentType { get; set; }

    public string? BillOfEntryNo { get; set; }

    public string? BillOfEntryDate { get; set; }

    public string RmsNonRms { get; set; } = null!;

    public string? IecNo { get; set; }

    public string? ReceiptType { get; set; }

    public string BillableNoBillable { get; set; } = null!;

    public string? BeGroup { get; set; }

    public string? PassingRemark { get; set; }

    public double? ExpenseAmount { get; set; }

    public string? ChequeNo { get; set; }

    public string? PaidTo { get; set; }

    public string? PayeeName { get; set; }

    public string? ReceiptAmount { get; set; }

    public string? ReceiptNo { get; set; }

    public string? Location { get; set; }

    public string? PaymentType { get; set; }

    public decimal? RdAmount { get; set; }

    public string? RdPercentage { get; set; }

    public decimal? FrankingAmount { get; set; }

    public string? TransitType { get; set; }

    public string OocFrom { get; set; } = null!;

    public string? AuthorRemark { get; set; }

    public string? RequestRemark { get; set; }

    public string? ScrutinyStatus { get; set; }

    public string? AuthorisedBy { get; set; }

    public string? RequestedBy { get; set; }

    public string? NocNumber { get; set; }

    public string? NocDate { get; set; }

    public string? CompletedDate { get; set; }

    public string? AuthorisedDate { get; set; }

    public string? RequestedDate { get; set; }

    public string? MblMawbDate { get; set; }

    public string? HblHawbDate { get; set; }

    public string? IgmDate2 { get; set; }

    public string? IgmDate3 { get; set; }

    public string? IgmFollowUpDate { get; set; }

    public string? CfsDate { get; set; }

    public string? IgmDate { get; set; }

    public string? InwardDate { get; set; }

    public string? Eta { get; set; }

    public string? Ata { get; set; }

    public string? ChecklistDate { get; set; }

    public string? CheckListForwardDate { get; set; }

    public string? ChecklistApproveDate { get; set; }

    public string? DutyRequestDate { get; set; }

    public string? DutyPaidDate { get; set; }

    public string? DdChallanDate { get; set; }

    public string? BillOfEntryPassingDate { get; set; }

    public string? AppraisingDate { get; set; }

    public string? QueryDate { get; set; }

    public string? ConsoleDoReceived { get; set; }

    public string? BlankChequeDate { get; set; }

    public string? FinalDoReceived { get; set; }

    public string? EmptyValidityDate { get; set; }

    public string? ConsolDoProcessDate { get; set; }

    public string? FinalDoProcessDate { get; set; }

    public string? CargoExaminationDate { get; set; }

    public string? DateOfDispatchFromCfs { get; set; }

    public string? OutOfChargeDate { get; set; }

    public DateOnly? OutOfChargeDate1 { get; set; }

    public string? FrankingDate { get; set; }

    public string? ChequeDate { get; set; }

    public string? ReceiptDate { get; set; }

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

    public string? FirstAppraisingDate { get; set; }

    public string? FirstAssessmentDate { get; set; }

    public string? ForwardAppraisingDate { get; set; }

    public string? CeInspectionDate { get; set; }

    public string? CheckingDate { get; set; }

    public string? DraftInvoiceDate { get; set; }

    public string? FinalTypingDate { get; set; }

    public string? GenerlisingDate { get; set; }

    public string? InvoiceDate { get; set; }

    public string? PickupPersonName { get; set; }

    public string? BlankChequeNo { get; set; }

    public string? DoBranch { get; set; }

    public string? EmptyYardName { get; set; }

    public int? SecurityDeposit { get; set; }

    public string? BondSubmitted { get; set; }

    public decimal? InvoiceAmount { get; set; }

    public string? InvoiceNumber { get; set; }

    public string? DeliveryDestination { get; set; }

    public string? DeliveryAddress { get; set; }

    public string? DeliveryInstruction { get; set; }

    public int? CustomerId { get; set; }

    public string Customer { get; set; } = null!;

    public string? SchemeLicenceType { get; set; }

    public string? ChecklistStatus { get; set; }

    public string? DutyStatus { get; set; }

    public string? CfsName { get; set; }

    public string? CurrentStatus { get; set; }

    public string? StatusHistory { get; set; }

    public string? IncoTerms { get; set; }

    public int? SumOf20 { get; set; }

    public int? SumOf40 { get; set; }

    public string? DeliveryType { get; set; }

    public string? RoadPermitNo { get; set; }

    public string? RoadPermitDate { get; set; }

    public string CustomerDivisionBranch { get; set; } = null!;

    public string CustomerPlant { get; set; } = null!;

    public string BabajiBranch { get; set; } = null!;

    public string? ContainerNo { get; set; }

    public string? MeasurementUnit { get; set; }

    public string? DutyPaymentType1 { get; set; }

    public string? LrNo { get; set; }

    public string? LrDate { get; set; }

    public string? DeliveryPoint { get; set; }

    public string? CargoReceivedBy { get; set; }

    public string? NFormNo { get; set; }

    public decimal? OctroiAmount { get; set; }

    public string? OctroiReceiptNo { get; set; }

    public string? TransporterName { get; set; }

    public string? VehicleNo { get; set; }

    public string? SFormNo { get; set; }

    public string? VehicleType { get; set; }

    public string? InvoiceNo { get; set; }

    public string? TermsOfInvoice { get; set; }

    public string? Quantity { get; set; }

    public string? CthNo { get; set; }

    public decimal? IgstAssessableValue { get; set; }

    public decimal? ProductAssessableValue { get; set; }
}
