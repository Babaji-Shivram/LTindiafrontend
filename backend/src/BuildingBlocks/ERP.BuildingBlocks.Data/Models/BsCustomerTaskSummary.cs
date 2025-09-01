using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsCustomerTaskSummary
{
    public int Lid { get; set; }

    public int? CustTaskId { get; set; }

    public string? FollowupUpdate { get; set; }

    public int? StatusId { get; set; }

    public string? TaskFilePath { get; set; }

    public DateTime? FollowupDate { get; set; }

    public bool? IsApprove { get; set; }

    public int? LUser { get; set; }

    public DateTime? DtDate { get; set; }

    public bool? BDel { get; set; }
}
