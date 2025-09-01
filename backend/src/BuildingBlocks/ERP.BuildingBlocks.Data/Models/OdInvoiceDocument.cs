using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class OdInvoiceDocument
{
    public int Lid { get; set; }

    public int InvoiceId { get; set; }

    public int RequestId { get; set; }

    public int? DorespId { get; set; }

    public string? DocTitle { get; set; }

    public string? DocPath { get; set; }

    public string? DocName { get; set; }

    /// <summary>
    /// 1 - Invoice, 2 Delivery Order
    /// </summary>
    public int? DocType { get; set; }

    public bool? IsDocopy { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public bool Bdel { get; set; }

    public int? UpdUser { get; set; }

    public DateTime? UpdDate { get; set; }
}
