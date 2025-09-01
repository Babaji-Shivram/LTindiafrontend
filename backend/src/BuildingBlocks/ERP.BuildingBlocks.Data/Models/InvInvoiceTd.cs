using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class InvInvoiceTd
{
    public int Lid { get; set; }

    public int InvoiceId { get; set; }

    public int InvoiceItemId { get; set; }

    public decimal? TaxableValue { get; set; }

    public int TdsledgerCodeId { get; set; }

    public decimal Tdsrate { get; set; }

    public decimal Tdsamount { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public int? UpdUser { get; set; }

    public DateTime? UpdDate { get; set; }

    public bool BDel { get; set; }
}
