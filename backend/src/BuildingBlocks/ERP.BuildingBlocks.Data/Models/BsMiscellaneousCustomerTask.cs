using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsMiscellaneousCustomerTask
{
    public int Lid { get; set; }

    public int? CustomerId { get; set; }

    public bool? IsBillable { get; set; }

    public int? BranchId { get; set; }

    public int? PriorityId { get; set; }

    public int? OperatioMmsid { get; set; }

    public int? EmpId { get; set; }

    public int? ActivityTypeId { get; set; }

    public string? ActivityDetail { get; set; }

    public string? Subject { get; set; }

    public string? ContactPerson { get; set; }

    public DateTime? StartDate { get; set; }

    public DateTime? EstimateDate { get; set; }

    public string? DelFollowuUpdate { get; set; }

    public int? StatusId { get; set; }

    public int? JobId { get; set; }

    public DateTime? DelfollouptDate { get; set; }

    public string? CustFilePath { get; set; }

    public bool? DelIsApprove { get; set; }

    public int? DelClintId { get; set; }

    public int? BDel { get; set; }

    public DateTime? DtDate { get; set; }

    public int? UpdUser { get; set; }

    public int? LUser { get; set; }

    public int? LUserType { get; set; }

    public DateTime? UpdDate { get; set; }
}
