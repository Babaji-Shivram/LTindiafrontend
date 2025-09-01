using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class OdInvoiceContainer
{
    public int Lid { get; set; }

    public int InvoiceRequestId { get; set; }

    public int ContainerId { get; set; }

    public DateTime? ValidTill { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public bool Bdel { get; set; }

    public DateTime? UpdDate { get; set; }

    public int? UpdUser { get; set; }
}
