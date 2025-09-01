using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;
public partial class AcInvoiceLedgerDetail
{
    public int Lid { get; set; }

    public int InvoiceId { get; set; }

    public string? CgstparCodeId { get; set; }

    public string? SgstparCodeId { get; set; }

    public string? IgstparCodeId { get; set; }

    public string? RcmcgstparCodeId { get; set; }

    public string? RcmsgstparCodeId { get; set; }

    public string? RcmIgstparCodeId { get; set; }

    public int LUser { get; set; }

    public DateTime? DtDate { get; set; }

    public DateTime? UpdDate { get; set; }

    public int? UpdUser { get; set; }

    public bool BDel { get; set; }
}
