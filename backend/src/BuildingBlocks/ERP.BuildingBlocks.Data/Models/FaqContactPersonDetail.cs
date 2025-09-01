using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class FaqContactPersonDetail
{
    public int Lid { get; set; }

    public int? Faqid { get; set; }

    public string? ContactPerName { get; set; }

    public int? BranchId { get; set; }

    public string? ContactPerEmailId { get; set; }

    public string? ContactPerPhoneNo { get; set; }

    public int? ContactType { get; set; }

    public bool BDel { get; set; }

    public DateTime? DtDate { get; set; }

    public int? LUser { get; set; }
}
