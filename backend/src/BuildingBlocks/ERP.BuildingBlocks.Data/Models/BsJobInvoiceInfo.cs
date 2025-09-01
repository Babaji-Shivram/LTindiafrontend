using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsJobInvoiceInfo
{
    public int Lid { get; set; }

    public int JobId { get; set; }

    public int ModuleId { get; set; }

    public string? CurrencyList { get; set; }

    public string? InvoiceNoList { get; set; }

    public string? InvoiceDateList { get; set; }

    public string? InvoiceAmountList { get; set; }

    public string? SchemeTypeList { get; set; }

    public string? SchemeNoList { get; set; }

    public string? SchemeDateList { get; set; }

    public int LUser { get; set; }

    public bool? Bdel { get; set; }

    public DateTime? DtDate { get; set; }

    public DateTime? UpdDate { get; set; }
}
