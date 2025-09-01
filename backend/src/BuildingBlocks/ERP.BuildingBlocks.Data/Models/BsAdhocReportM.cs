using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsAdhocReportM
{
    public int LId { get; set; }

    public string ReportName { get; set; } = null!;

    public int LUser { get; set; }

    /// <summary>
    /// 1 For Babaji User, 2 For Customer User and -1 for Admin User
    /// </summary>
    public int UserType { get; set; }

    public int? BabajiGroupId { get; set; }

    public int? ReportType { get; set; }

    public int? CustomerId { get; set; }

    public int? LastReportGeneratedBy { get; set; }

    public DateTime? LastReportGeneratedDate { get; set; }

    public int? ModuleId { get; set; }

    public int? IsCustomer { get; set; }

    public bool BDel { get; set; }

    public DateTime DtDate { get; set; }

    public int? UpdUser { get; set; }

    public DateTime? UpdDate { get; set; }
}
