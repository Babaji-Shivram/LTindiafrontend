using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class CrmUserM
{
    public int? Lid { get; set; }

    public string SName { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string? PhoneNo { get; set; }

    public string? Profile { get; set; }

    public int? ReportingTo { get; set; }

    /// <summary>
    /// 1 =&gt; All, 2 =&gt;Web, 3 =&gt; Mobile
    /// </summary>
    public int LoginAllowTo { get; set; }

    /// <summary>
    /// 0 =&gt; inactive, 1 =&gt; active
    /// </summary>
    public bool StatusId { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public int? UpdUser { get; set; }

    public DateTime? UpdDate { get; set; }

    public bool BDel { get; set; }
}
