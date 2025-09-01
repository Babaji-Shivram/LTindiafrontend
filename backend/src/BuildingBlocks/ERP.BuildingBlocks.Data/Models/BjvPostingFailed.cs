using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BjvPostingFailed
{
    public int Lid { get; set; }

    public int InvoiceId { get; set; }

    public bool IsJbbooking { get; set; }

    public DateTime DtDate { get; set; }
}
