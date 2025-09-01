using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsJobPassingDetail
{
    public int LId { get; set; }

    public int JobId { get; set; }

    public DateTime? AppraisingDate { get; set; }

    public DateTime? AssessmentDate { get; set; }

    public DateTime? QueryDate { get; set; }

    public int? StageId { get; set; }

    public bool? BondStatus { get; set; }

    public string? Remark { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public int? UpdUser { get; set; }

    public DateTime? UpdDate { get; set; }

    public bool BDel { get; set; }

    public virtual ICollection<BsTruncatePreventKey> BsTruncatePreventKeys { get; set; } = new List<BsTruncatePreventKey>();
}
