using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class ImsItemHistory
{
    public long Lid { get; set; }

    public int ItemId { get; set; }

    public string? VendorName { get; set; }

    public string? BillNo { get; set; }

    public DateTime? BillDate { get; set; }

    public string? BillAmount { get; set; }

    public int Quantity { get; set; }

    public string? Remark { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public int? FinYear { get; set; }
}
