using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class CmJobCfsrefundStatus
{
    public int Lid { get; set; }

    public int JobId { get; set; }

    public DateTime FollowUpDate { get; set; }

    public string? FollowUpRemark { get; set; }

    public bool IsActive { get; set; }

    public int LStatus { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public int? UpdUser { get; set; }

    public DateTime? UpdDate { get; set; }

    public bool BDel { get; set; }
}
