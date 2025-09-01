using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsNformHistory
{
    public int Lid { get; set; }

    public int VendorId { get; set; }

    public long JobId { get; set; }

    public int DeliveryId { get; set; }

    public DateTime? NformClosingDate { get; set; }

    public int LUser { get; set; }

    public bool BDel { get; set; }

    public DateTime DtDate { get; set; }

    public decimal? Amount { get; set; }
}
