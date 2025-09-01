using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class TstPaneltyDetail
{
    public long Lid { get; set; }

    public long JobId { get; set; }

    public int LType { get; set; }

    public int? Days { get; set; }

    public int BranchId { get; set; }

    public int? UserId { get; set; }

    public bool BDel { get; set; }

    public DateTime DtDate { get; set; }
}
