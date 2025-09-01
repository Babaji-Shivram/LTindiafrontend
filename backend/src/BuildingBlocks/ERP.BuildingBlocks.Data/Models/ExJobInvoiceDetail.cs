using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class ExJobInvoiceDetail
{
    public int Lid { get; set; }

    public int JobId { get; set; }

    public int? SrNo { get; set; }

    public string InvoiceNo { get; set; } = null!;

    public DateOnly? InvoiceDate { get; set; }

    public string? InvoiceValue { get; set; }

    public string? InvoiceCurrency { get; set; }

    public int? ShipmentTermId { get; set; }

    public string? Dbkamount { get; set; }

    public string? LicenseNo { get; set; }

    public DateOnly? LicenseDate { get; set; }

    public string? FreightAmount { get; set; }

    public string? InsuranceAmount { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public bool BDel { get; set; }
}
