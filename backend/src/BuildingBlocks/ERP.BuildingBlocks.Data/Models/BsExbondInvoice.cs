using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsExbondInvoice
{
    public int LId { get; set; }

    public int JobId { get; set; }

    public int InvoiceId { get; set; }

    public decimal OriginalQuantity { get; set; }

    public decimal ExbondQuantity { get; set; }

    public decimal BalanceQuantity { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public bool BDel { get; set; }
}
