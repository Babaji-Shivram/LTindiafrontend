using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsPcdinvoiceDetail
{
    public int LId { get; set; }

    public int JobId { get; set; }

    public DateTime? DraftInvoiceDate { get; set; }

    public DateTime? CheckingDate { get; set; }

    public DateTime? FinalTypingDate { get; set; }

    public DateTime? GenerlisingDate { get; set; }

    public string InvoiceNo { get; set; } = null!;

    public DateTime? InvoiceDate { get; set; }

    public decimal? InvoiceAmount { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public bool BDel { get; set; }
}
