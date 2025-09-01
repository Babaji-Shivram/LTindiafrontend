using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class MigGstLedgerCode
{
    public int LId { get; set; }

    public string? ParCode { get; set; }

    public string? ParName { get; set; }

    public double? Ledgcode { get; set; }

    public string? Gstn { get; set; }

    public string? BookCode { get; set; }

    public string? BookName { get; set; }

    public string? TransactionType { get; set; }

    public string? Rcmapplicable { get; set; }

    public string? RelevantColumnInvoiceDetail { get; set; }

    public bool? IsRcm { get; set; }

    public string? Gsttype { get; set; }

    public bool? IsNoItc { get; set; }
}
