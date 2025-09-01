using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsPcdscrutinyRejectDetail
{
    public int Lid { get; set; }

    public int RejectId { get; set; }

    public int JobId { get; set; }

    public int RejectTypeId { get; set; }

    public string RejectRemark { get; set; } = null!;

    public DateTime? RejectDate { get; set; }

    public int? Rejectedby { get; set; }

    public int? Completedby { get; set; }

    public DateTime? CompletedDate { get; set; }

    public DateTime? Followupdate { get; set; }

    public string? FollowupRemark { get; set; }

    public string? Lrdctype { get; set; }

    /// <summary>
    /// 1 - Transport, 2 - CFS, 3 - KAM, 4 -DO, 10 Other
    /// </summary>
    public int? CategoryId { get; set; }

    public bool? Isactive { get; set; }

    public int LUser { get; set; }

    public bool BDel { get; set; }

    public DateTime DtDate { get; set; }

    public int? ModuleId { get; set; }
}
