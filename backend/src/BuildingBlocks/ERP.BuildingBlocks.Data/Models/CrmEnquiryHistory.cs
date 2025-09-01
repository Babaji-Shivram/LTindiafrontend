using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class CrmEnquiryHistory
{
    public int Lid { get; set; }

    public int EnquiryId { get; set; }

    /// <summary>
    /// 0 =&gt;Sent for approval, 1=&gt; approved, 2=&gt; rejected 
    /// </summary>
    public int? StatusId { get; set; }

    public string? Remark { get; set; }

    public bool IsActive { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public bool BDel { get; set; }
}
