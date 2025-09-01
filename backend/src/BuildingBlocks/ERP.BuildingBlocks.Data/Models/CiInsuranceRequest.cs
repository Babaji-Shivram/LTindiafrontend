using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class CiInsuranceRequest
{
    public int Lid { get; set; }

    public string? JobRefNo { get; set; }

    public string? Email { get; set; }

    public string? UniqueId { get; set; }

    public string? InsuredName { get; set; }

    public string? Address { get; set; }

    public string? City { get; set; }

    public string? State { get; set; }

    public string? Pincode { get; set; }

    public string? BillingName { get; set; }

    public string? BillingAddress { get; set; }

    public string? BillingCity { get; set; }

    public string? BillingState { get; set; }

    public string? BillingPincode { get; set; }

    public string? BillingGstin { get; set; }

    public string? Commodity { get; set; }

    public string? TransitType { get; set; }

    public string? TransitMode { get; set; }

    public string? CoverageFrom { get; set; }

    public string? CoverageTo { get; set; }

    public DateTime? CoverageStartDt { get; set; }

    public string? ContainerNo { get; set; }

    public string? ContainerSize { get; set; }

    public decimal? ContainerValue { get; set; }

    public string? Seller { get; set; }

    public string? Buyer { get; set; }

    public string? ReferenceNo { get; set; }

    public string? AdditionalInfo { get; set; }

    public string? NetPremium { get; set; }

    public string? IsConditionsAccepted { get; set; }

    public int LStatus { get; set; }

    public int IsbillTo { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public bool BDel { get; set; }

    public int? UpdUser { get; set; }

    public DateTime? UpdDate { get; set; }
}
