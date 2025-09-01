using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class KycContactDetail
{
    public int Lid { get; set; }

    public int VendorId { get; set; }

    /// <summary>
    /// 1 =&gt; Operation, 2 =&gt; Finance, 3 =&gt; Others
    /// </summary>
    public int LType { get; set; }

    public string? Name { get; set; }

    public string? Email { get; set; }

    public string? MobileNo { get; set; }

    public string? LandlineNo { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public int? UpdUser { get; set; }

    public DateTime? UpdDate { get; set; }

    public bool BDel { get; set; }
}
