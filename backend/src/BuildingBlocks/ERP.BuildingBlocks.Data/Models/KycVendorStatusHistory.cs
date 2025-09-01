using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class KycVendorStatusHistory
{
    public int Lid { get; set; }

    public int VendorId { get; set; }

    public bool IsApproved { get; set; }

    public string? Remark { get; set; }

    public bool IsActive { get; set; }

    public int? LUser { get; set; }

    public DateTime DtDate { get; set; }

    public bool BDel { get; set; }
}
