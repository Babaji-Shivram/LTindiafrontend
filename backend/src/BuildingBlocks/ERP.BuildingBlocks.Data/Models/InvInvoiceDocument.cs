using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class InvInvoiceDocument
{
    public int Lid { get; set; }

    public int InvoiceId { get; set; }

    /// <summary>
    /// 1-Invoice Copy,2 - Email Approval, 3 Other, 10 - Vendor Payment Acknowledge Receipt
    /// </summary>
    public int DocumentId { get; set; }

    public string FilePath { get; set; } = null!;

    public string FileName { get; set; } = null!;

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public bool BDel { get; set; }

    public int? UpdUser { get; set; }

    public DateTime? UpdDate { get; set; }
}
