using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class VwSezjobDetail
{
    public int JobId { get; set; }

    public string BsJobNo { get; set; } = null!;

    public string? Customer { get; set; }

    public string? Mode { get; set; }

    public string? SezType { get; set; }

    public string? Person { get; set; }

    public string? DivisionName { get; set; }

    public string? PlantName { get; set; }

    public int? Currency { get; set; }

    public decimal? ExRate { get; set; }

    public decimal? AssesableValue { get; set; }

    public string? BeNo { get; set; }

    public DateOnly? BeDate { get; set; }

    public string? RequestId { get; set; }

    public decimal? DutyAmount { get; set; }

    public DateOnly? InwardDate { get; set; }

    public int? NoOfPackages { get; set; }

    public decimal? GrossWeight { get; set; }

    public int? NoOfVehicles { get; set; }

    public DateOnly? OutwardDate { get; set; }

    public DateOnly? OutwardDate1 { get; set; }

    public DateOnly? PcdFrDahej { get; set; }

    public DateOnly? PcdSentClient { get; set; }

    public DateOnly? FileSentBilling { get; set; }

    public string? Remark { get; set; }

    public decimal? CifValue { get; set; }

    public string? ChaCode { get; set; }

    public string? BuyerName { get; set; }

    public string? GrossWtUnit { get; set; }

    public string? Destination { get; set; }

    public string? CountryName { get; set; }

    public int FinYear { get; set; }

    public DateTime JobCreatedDate { get; set; }

    public int? CustomerId { get; set; }

    public string BabajiBranchId { get; set; } = null!;

    public string BabajiBranch { get; set; } = null!;

    public string? JobCreatedBy { get; set; }

    public string? InvoiceNo { get; set; }

    public DateOnly? InvoiceDate { get; set; }

    public decimal? InvoiceValue { get; set; }

    public string? Description { get; set; }

    public decimal? RemainingQuantity { get; set; }

    public decimal? Quantity { get; set; }

    public decimal? ItemPrice { get; set; }

    public decimal? ProductValue { get; set; }

    public decimal? Cth { get; set; }

    public string? ContainerNo { get; set; }

    public string? ContainerSize { get; set; }

    public string? ContainerType { get; set; }
}
