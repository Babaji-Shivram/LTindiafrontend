using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class FopVwFreightDetail
{
    public int EnqId { get; set; }

    public int EnqUserId { get; set; }

    public string EnqRefNo { get; set; } = null!;

    public string Status { get; set; } = null!;

    public int? FinYear { get; set; }

    public string? Customer { get; set; }

    public string? CustRefNo { get; set; }

    public int? SalesRepId { get; set; }

    public string? Consignee { get; set; }

    public string? Shipper { get; set; }

    public string? ConsigneeAddress { get; set; }

    public string? ShipperAddress { get; set; }

    public string? Agent { get; set; }

    public int? CountOf20 { get; set; }

    public int? CountOf40 { get; set; }

    public double? LclVolume { get; set; }

    public int? CountOfLcl { get; set; }

    public string ContainerType { get; set; } = null!;

    public string IsDangerousGood { get; set; } = null!;

    public double? GrossWeight { get; set; }

    public double? ChargeableWeight { get; set; }

    public int? NoOfPkg { get; set; }

    public string? CargoDescription { get; set; }

    public string? BranchName { get; set; }

    public string FreightMode { get; set; } = null!;

    public string Terms { get; set; } = null!;

    public string FreightType { get; set; } = null!;

    public string? PkgType { get; set; }

    public string? Country { get; set; }

    public string? PortOfLoading { get; set; }

    public string? PortOfDischarge { get; set; }

    public string? PortCity { get; set; }

    public string? SalesRep { get; set; }

    public string? EnqUser { get; set; }

    public string? JobNo { get; set; }

    public string? BookingDetails { get; set; }

    public string? InvoiceNo { get; set; }

    public string? PoNumber { get; set; }

    public int? OperationUserId { get; set; }

    public string? MblNumber { get; set; }

    public string? HblNumber { get; set; }

    public string? VesselFlightName { get; set; }

    public string? VesselFlightNumber { get; set; }

    public string? FinalAgent { get; set; }

    public string? PreAlertEmailTo { get; set; }

    public string? IgmNumber { get; set; }

    public string? ItemNo { get; set; }

    public decimal? CanTotalAmount { get; set; }

    public decimal? CanAmount { get; set; }

    public decimal? CanTax { get; set; }

    public string? ChaName { get; set; }

    public string? DoIssuedTo { get; set; }

    public string? DoChequeNo { get; set; }

    public decimal? DoAmount { get; set; }

    public string? DoPaymentTerm { get; set; }

    public string? DoPaymentType { get; set; }

    public string? DoRemark { get; set; }

    public string? BillNumber { get; set; }

    public decimal? BillAmount { get; set; }

    public string? BillingRemark { get; set; }

    public string? FreightActivity { get; set; }

    public string? AgentInvoiceCurrency { get; set; }

    public string? JbNumber { get; set; }

    public string? AgentInvoiceName { get; set; }

    public string? AgentInvoiceNo { get; set; }

    public decimal AgentInvoiceAmount { get; set; }

    public string? LostReason { get; set; }

    public string? OperationUser { get; set; }

    public DateTime? CanCreatedDate { get; set; }

    public string? CanCreatedBy { get; set; }

    public string? EnqCreatedDate { get; set; }

    public string? EnqDate { get; set; }

    public string? JobCreatedDate { get; set; }

    public string? BookingMonth { get; set; }

    public string? InvoiceDate { get; set; }

    public string? AgentInvoiceDate { get; set; }

    public string? MblDate { get; set; }

    public string? HblDate { get; set; }

    public string? LeoDate { get; set; }

    public string? Eta { get; set; }

    public string? Etd { get; set; }

    public string? IgmDate { get; set; }

    public string? Ata { get; set; }

    public string? ShippedOnBoardDate { get; set; }

    public string? DoChequeDate { get; set; }

    public string? DoCreatedDate { get; set; }

    public string? BillingAdviceDate { get; set; }

    public string? BillingFileRcvdOn { get; set; }

    public string? BillDate { get; set; }

    public string? BillingDispatchDate { get; set; }

    public string? BillCreatedDate { get; set; }

    public string? JbDate { get; set; }

    public string? QuoteDate { get; set; }

    public string? AwardDate { get; set; }

    public string? LostDate { get; set; }

    public string? EtaAtTranshipment { get; set; }

    public string? EtdFromTranshipment { get; set; }

    public string? AtaAtDestination { get; set; }

    public string? VgmDate { get; set; }

    public string? Form13Date { get; set; }

    public string? SbNo { get; set; }

    public string? SbDate { get; set; }

    public string? TypeOfExport { get; set; }

    public int? EnquiryValue { get; set; }

    public int? BranchId { get; set; }

    public int? CustomerId { get; set; }
}
