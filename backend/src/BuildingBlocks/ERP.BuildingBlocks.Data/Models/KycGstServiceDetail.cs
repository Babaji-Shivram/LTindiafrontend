using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class KycGstServiceDetail
{
    public int Lid { get; set; }

    public int VendorId { get; set; }

    public string? ServiceProvided { get; set; }

    public string? ServiceCatg { get; set; }

    public string? Saccode { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public int? UpdUser { get; set; }

    public DateTime? UpdDate { get; set; }

    public bool BDel { get; set; }
}
