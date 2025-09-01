using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class SfPreAlertDoc
{
    public int Lid { get; set; }

    public int? JobId { get; set; }

    public string? SkffileName { get; set; }

    public int DocumentId { get; set; }

    public DateTime DocumentDateTime { get; set; }

    public string? CurrencyId { get; set; }

    public string? ExtendedAmount { get; set; }

    public string? TotalAmount { get; set; }

    public string? SupplierPartyId { get; set; }

    public string? SupplierPartyName { get; set; }

    public string? SupplierAddressLineOne { get; set; }

    public string? SupplierPartyCityName { get; set; }

    public string? SupplierPartyCountryCode { get; set; }

    public string? SupplierPartyPostalCode { get; set; }

    public string? ExporterPartyId { get; set; }

    public string? ExporterPartyName { get; set; }

    public string? ExporterAddressLineOne { get; set; }

    public string? ExporterCityName { get; set; }

    public string? ExporterCountryCode { get; set; }

    public string? ExporterPostalCode { get; set; }

    public string? CountryOfExportationCode { get; set; }

    public string? ImporterPartyId { get; set; }

    public string? ImporterPartyName { get; set; }

    public string? ImporterAddressLineOne { get; set; }

    public string? ImporterCityName { get; set; }

    public string? ImporterCountryCode { get; set; }

    public string? ImporterPostalCode { get; set; }

    public string? ShipToPartyId { get; set; }

    public string? ShipToPartyName { get; set; }

    public string? ShipToAddressLineOne { get; set; }

    public string? ShipToCityName { get; set; }

    public string? ShipToCountryCode { get; set; }

    public string? ShipToPostalCode { get; set; }

    public string? LoadsetReference { get; set; }

    public string? InvoiceReferenceNo { get; set; }

    public DateTime? InvoiceReferenceDate { get; set; }

    public string? PaymentTerm { get; set; }

    public string? ChargeDescription { get; set; }

    public string? ChargecurrencyId { get; set; }

    public string? ChargeAmount { get; set; }

    public string? ChargeReasonCode { get; set; }

    public string? IncotermsCode { get; set; }

    public string? PlaceOfOwnershipTransferLocation { get; set; }

    public string? NetWeightMeasure { get; set; }

    public string? NetWeightMeasureUnitCode { get; set; }

    public string? GrossWeightMeasure { get; set; }

    public string? GrossWeightMeasureUnitCode { get; set; }

    public string? ShipUnitQuantity { get; set; }

    public string? PackagingLabelId { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public int? UpdUser { get; set; }

    public DateTime? UpdDate { get; set; }
}
