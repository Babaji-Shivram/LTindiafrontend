using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class VnKycHistory
{
    public int LId { get; set; }

    public int VendorKycId { get; set; }

    public int StatusId { get; set; }

    public string? Remark { get; set; }

    public bool? Isactive { get; set; }

    public bool? IsFinal { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public bool BDel { get; set; }
}
