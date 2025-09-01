using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class KycGstdetail
{
    public int Lid { get; set; }

    public int VendorId { get; set; }

    public string Name { get; set; } = null!;

    public int BranchId { get; set; }

    public string? Address { get; set; }

    public string? PersonName { get; set; }

    public string? MobileNo { get; set; }

    public string? Email { get; set; }

    public string? GstprovisionNo { get; set; }

    public string? Arnno { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public int? UpdUser { get; set; }

    public DateTime? UpdDate { get; set; }

    public bool BDel { get; set; }
}
