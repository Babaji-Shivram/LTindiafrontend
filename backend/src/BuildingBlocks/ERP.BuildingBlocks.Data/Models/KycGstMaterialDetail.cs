using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class KycGstMaterialDetail
{
    public int Lid { get; set; }

    public int VendorId { get; set; }

    public string? MaterialSupplied { get; set; }

    public string? CommodityName { get; set; }

    public string? Hsncode { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public int? UpdUser { get; set; }

    public DateTime? UpdDate { get; set; }

    public bool BDel { get; set; }
}
