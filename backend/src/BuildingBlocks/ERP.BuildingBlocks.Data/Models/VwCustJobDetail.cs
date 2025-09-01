using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class VwCustJobDetail
{
    public int AlertId { get; set; }

    public int JobId { get; set; }

    public int? CustomerId { get; set; }

    public int? BabajiBranchId { get; set; }

    public string? BsJobNo { get; set; }

    public string? CustRefNo { get; set; }

    public DateTime PreAlertDate { get; set; }

    public string? CountryOfOrigin { get; set; }

    public string Consignee { get; set; } = null!;

    public string Mode { get; set; } = null!;

    public string PortOfDischarge { get; set; } = null!;

    public string? JobType { get; set; }

    public string? BeType { get; set; }

    public string? EtaDate { get; set; }

    public string? AtaDate { get; set; }

    public int? NoOfPackages { get; set; }

    public decimal? GrossWeight { get; set; }

    public string? Supplier { get; set; }

    public string? ShortDescription { get; set; }

    public string? IgmNo { get; set; }

    public string? LandIgmNo { get; set; }

    public string? IgmDate { get; set; }

    public string? LandIgmDate { get; set; }

    public string? BoeNo { get; set; }

    public string? BoeDate { get; set; }

    public string? PassingQuery { get; set; }

    public string? QueryDate { get; set; }

    public bool ClearedStatus { get; set; }

    public string? ResolveQueryDate { get; set; }

    public string? NocRefNo { get; set; }

    public string? NocRefDate { get; set; }

    public string? DeliveryType { get; set; }

    public string? PassingDate { get; set; }

    public string? AppraisingDate { get; set; }

    public string? ExaminationDate { get; set; }

    public string? OutOfChargeDate { get; set; }

    public string? DeliveryDestination { get; set; }

    public int? NoOfContainer { get; set; }

    public string? ContainerSize { get; set; }

    public string NoOfFclContainer { get; set; } = null!;

    public string NoOfLclContainer { get; set; } = null!;

    public string? ChkRequestedBy { get; set; }

    public string? ChkAuthorisedBy { get; set; }

    public string? ContainerNo { get; set; }

    public string? ChecklistRemark { get; set; }

    public string? ChkAuthorRemark { get; set; }

    public string? DutyPaymentType { get; set; }

    public DateTime? ChkRequestedDate { get; set; }

    public DateTime? ChkAuthorisedDate { get; set; }

    public string CustomerName { get; set; } = null!;

    public string? DutyRequestDate { get; set; }

    public decimal? DutyAmount { get; set; }

    public decimal? IgstAmount { get; set; }

    public decimal? InterestAmount { get; set; }

    public decimal? PenaltyAmount { get; set; }

    public string? DutyChallanNo { get; set; }

    public string? DutyChallanDate { get; set; }

    public string? DutyPaymentDate { get; set; }

    public string? PaymentType { get; set; }

    public string? ChallanNo { get; set; }

    public string? ChallanDate { get; set; }

    public string? VehicleNo { get; set; }

    public string? Transporter { get; set; }

    public string? LrNo { get; set; }

    public string? LrDate { get; set; }

    public string? DispatchDate { get; set; }

    public string? DeliveredDate { get; set; }

    public string PcaToCustomer { get; set; } = null!;

    public string? CourierName { get; set; }

    public string? DispatchDocketNo { get; set; }

    public string? DocumentDeliveryDate { get; set; }

    public string? DocReceivedName { get; set; }

    public string? JobCreatedDate { get; set; }

    public string? InvoiceNo { get; set; }

    public string? TermsOfInvoice { get; set; }

    public string? InvoiceValue { get; set; }

    public string? InvoiceProductDescription { get; set; }

    public string? InvoiceUnitOfProduct { get; set; }

    public string? InvoiceUnitPrice { get; set; }

    public string? InvoiceDate { get; set; }

    public string? InvoiceCurrency { get; set; }

    public string? InvoiceQuantity { get; set; }
}
