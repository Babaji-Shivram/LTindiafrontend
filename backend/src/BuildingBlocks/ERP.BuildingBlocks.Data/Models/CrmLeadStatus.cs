using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class CrmLeadStatus
{
    public int Lid { get; set; }

    public int? LeadId { get; set; }

    public bool? Lead { get; set; }

    public bool? Enquiry { get; set; }

    public bool? Lost { get; set; }

    public bool? Converted { get; set; }

    public bool? Quote { get; set; }

    public bool? Kyc { get; set; }

    public bool? Contract { get; set; }

    public int? LUser { get; set; }

    public DateTime? DtDate { get; set; }

    public int? UpdUser { get; set; }

    public DateTime? UpdDate { get; set; }

    public bool? BDel { get; set; }
}
