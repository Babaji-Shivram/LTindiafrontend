using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class CrmActivityLog
{
    public int Lid { get; set; }

    public int? LeadId { get; set; }

    /// <summary>
    /// 1 =&gt; Lead, 2 =&gt; Opportunity, 3 =&gt; Enquiry
    /// </summary>
    public int? LType { get; set; }

    public int? RecordId { get; set; }

    public string Description { get; set; } = null!;

    public bool IsActive { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public bool BDel { get; set; }

    public int? CurrentStatusId { get; set; }
}
