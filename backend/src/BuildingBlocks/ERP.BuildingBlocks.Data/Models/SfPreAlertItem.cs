using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class SfPreAlertItem
{
    public int Lid { get; set; }

    public int AlertId { get; set; }

    public string? LineNumber { get; set; }

    public string? ItemId { get; set; }

    public string? RevisionId { get; set; }

    public string? PackageCode { get; set; }

    public string? CountryOfOriginCode { get; set; }

    public string? CountryOfManufactureCode { get; set; }

    public string? CommodityClassificationCode { get; set; }

    public string? CustomsTariffClassification { get; set; }

    public string? InnerDiameterMeasureUnitCode { get; set; }

    public string? InnerDiameterMeasure { get; set; }

    public string? OuterDiameterMeasureUnitCode { get; set; }

    public string? OuterDiameterMeasure { get; set; }

    public string? QuantityUnitCode { get; set; }

    public string? Quantity { get; set; }

    public string? UnitPriceAmountCurrencyId { get; set; }

    public string? UnitPriceAmount { get; set; }

    public string? PerQuantityUnitCode { get; set; }

    public string? PerQuantity { get; set; }

    public string? CustomerOrderDocumentId { get; set; }

    public string? CustomerOrderLineNumber { get; set; }

    public string? CustomerOrderSubLineNumber { get; set; }

    public string? SalesOrderDocumentId { get; set; }

    public string? SalesOrderLineNumber { get; set; }

    public string? SalesOrderSubLineNumber { get; set; }

    public string? ItemExtendedAmountcurrencyId { get; set; }

    public string? ItemExtendedAmount { get; set; }

    public string? ItemNetWeightMeasureUnitCode { get; set; }

    public string? ItemNetWeightMeasure { get; set; }

    public string? ItemGrossWeightMeasureUnitCode { get; set; }

    public string? ItemGrossWeightMeasure { get; set; }

    public string? ShippingMaterialId { get; set; }

    public string? ShippingMaterialCode { get; set; }

    public bool? BReturnableContainerIndicator { get; set; }

    public string? ItemLabelId { get; set; }

    public string? PerPackageQuantity { get; set; }

    public bool BDel { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public int? UpdUser { get; set; }

    public DateTime? UpdDate { get; set; }
}
