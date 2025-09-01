using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class FrEnquiryAgent
{
    public long Lid { get; set; }

    public int EnqId { get; set; }

    public int AgentId { get; set; }

    public int CompanyId { get; set; }

    public bool IsMailSent { get; set; }

    public int LUser { get; set; }

    public bool BDel { get; set; }

    public DateTime DtDate { get; set; }
}
