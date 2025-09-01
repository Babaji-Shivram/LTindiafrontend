using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class FopInvoicePercentItem
{
    public long Lid { get; set; }

    public int EnqId { get; set; }

    public int InvoiceItemId { get; set; }

    public int PercentItemId { get; set; }

    public decimal InvoiceTotal { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public bool BDel { get; set; }
}
