using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class VwWabTecDsrReport
{
    public string? JobRefNo { get; set; }

    public string ImporterName { get; set; } = null!;

    public string? Boeno { get; set; }

    public string? Port { get; set; }

    public string? Month { get; set; }

    public string? StatusName { get; set; }

    public string? Ffname { get; set; }

    public string TransMode { get; set; } = null!;

    public string DivisionName { get; set; } = null!;

    public string? Supplier { get; set; }

    public string? CountryOfExport { get; set; }

    public string? PortOfLoading { get; set; }

    public string? PortOfDestination { get; set; }

    public string? IncoTerms { get; set; }

    public string? Mawbno { get; set; }

    public string? Hawbno { get; set; }

    public string? Dt { get; set; }

    public int? NoOfPackages { get; set; }

    public decimal? GrossWt { get; set; }

    public string? ReportMode { get; set; }

    public string? Liner { get; set; }

    public string? ContainerNo { get; set; }

    public int Count20 { get; set; }

    public int Count40 { get; set; }

    public string? VesselName { get; set; }

    public DateTime? Etadate { get; set; }

    public string? Cfsname { get; set; }

    public string? Cfsdate { get; set; }

    public string? ChecklistRequestDt { get; set; }

    public string? ChecklistApproveDt { get; set; }

    public string? Igmno { get; set; }

    public string? Igmdate { get; set; }

    public string? InwardDate { get; set; }

    public string? InvoiceNo { get; set; }

    public string? InvoiceDate { get; set; }

    public string? InvoiceValue { get; set; }

    public string? Currency { get; set; }

    public string? Boedate { get; set; }

    public string? BetypeName { get; set; }

    public string RmsnonRms { get; set; } = null!;

    public string? SchemeType { get; set; }

    public decimal? InvoiceFreightAmount { get; set; }

    public decimal? InvoiceMiscAmount { get; set; }

    public string? ExchangeRate { get; set; }

    public decimal? AssessableValue { get; set; }

    public decimal? Bcdamt { get; set; }

    public decimal? Igstamount { get; set; }

    public decimal? Swsamt { get; set; }

    public decimal DutyAmt { get; set; }

    public decimal InterestAmt { get; set; }

    public decimal PenaltyAmt { get; set; }

    public decimal TotCustomeDuty { get; set; }

    public string? DutyReqDt { get; set; }

    public string? DutyPaidDt { get; set; }

    public string? ChallanNo { get; set; }

    public string? ChallanDt { get; set; }

    public string? ExaminDt { get; set; }

    public string? Oocdate { get; set; }

    public string? BondType { get; set; }

    public string? BondNo { get; set; }

    public string? BondDt { get; set; }

    public string? Whdetail { get; set; }

    public string? ShipmentReadyDt { get; set; }

    public string? ShipmentClearedDt { get; set; }

    public string? ReportingDt { get; set; }

    public string? DeliveryPoint { get; set; }

    public string? AgencyInvoiceNo { get; set; }

    public string? AgencyInvdate { get; set; }

    public string? RimInvoiceNo { get; set; }

    public string? RimInvdate { get; set; }

    public int? ClearanceTat { get; set; }

    public string? DailyProgress { get; set; }

    public string? CustName { get; set; }

    public string? Lrno { get; set; }

    public string? TypeOfvehicle { get; set; }

    public decimal? WeightForLr { get; set; }

    public bool ClearedStatus { get; set; }

    public int? DivisionId { get; set; }

    public string? CbmChgWt { get; set; }

    public string? Cbm2Wt { get; set; }

    public string? CdrUploadDt { get; set; }

    public string? ChaInvoiceStatus { get; set; }

    public string? ClearancePoNo { get; set; }

    public string? CustomsHolidayInBetween { get; set; }

    public string? Etd { get; set; }

    public string? HaltingDays { get; set; }

    public string? ImportCategory { get; set; }

    public string? ReceiptedChargesPoNo { get; set; }

    public string? Reference { get; set; }

    public string? StampDutyAmount { get; set; }
}
