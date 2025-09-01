using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class TblInvoiceMst
{
    public decimal InvId { get; set; }

    public string? InvoiceNo { get; set; }

    public DateTime? InvoiceDate { get; set; }

    public string? ConsigneeName { get; set; }

    public string? JobNo { get; set; }

    public string? Blno { get; set; }

    public DateTime? Bldate { get; set; }

    public string? ShipperName { get; set; }

    public string? Mode { get; set; }

    public DateTime? DispatchDate { get; set; }

    public string? ContainerType { get; set; }

    public decimal? TotalQty { get; set; }

    public decimal? TotalAmt { get; set; }

    public decimal? Gstamt { get; set; }

    public decimal? PayableAmt { get; set; }

    public string? JobType { get; set; }

    public string? BeNo { get; set; }

    public DateTime? BeDate { get; set; }

    public string? PortOfDischarge { get; set; }

    public decimal? InvoiceNumber { get; set; }

    public decimal? AddedBy { get; set; }

    public DateTime? AddedOn { get; set; }

    public decimal? ModifiedBy { get; set; }

    public DateTime? ModifiedOn { get; set; }
}
