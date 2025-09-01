using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsUserBranch
{
    public int LId { get; set; }

    public int UserId { get; set; }

    public int BranchId { get; set; }

    public int? LUser { get; set; }

    public bool BDel { get; set; }

    public DateTime DtDate { get; set; }
}
