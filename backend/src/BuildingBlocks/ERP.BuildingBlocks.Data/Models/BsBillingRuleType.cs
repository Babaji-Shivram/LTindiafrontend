using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsBillingRuleType
{
    public int Lid { get; set; }

    public string SName { get; set; } = null!;

    /// <summary>
    /// Priority Order Set
    /// </summary>
    public int LOrder { get; set; }

    public string? SRemark { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public bool BDel { get; set; }
}
