using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class MigDynamicDrill
{
    public int Lid { get; set; }

    public int? JobId { get; set; }

    public string? JobNo { get; set; }

    public string? BoeNumber { get; set; }

    public DateTime? BoeDate { get; set; }

    public string? PortOfDischarge { get; set; }

    public string? ImportAgency { get; set; }

    public string? Filters { get; set; }

    public string? AdCode { get; set; }

    public string? ShippingPort { get; set; }

    public string? BillAmountInr { get; set; }

    public string? SettledBillAmountInr { get; set; }

    public double? UnSettledBillAmountInr { get; set; }

    public string? MasterStatus { get; set; }

    public double? AmountInrBn { get; set; }

    public string? Status { get; set; }

    public bool? IsSuccess { get; set; }
}
