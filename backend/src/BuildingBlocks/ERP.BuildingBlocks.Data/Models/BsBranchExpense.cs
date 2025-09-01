using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsBranchExpense
{
    public long Lid { get; set; }

    public int BranchId { get; set; }

    public long PaidAmount { get; set; }

    public DateOnly PaidDate { get; set; }

    public string? Remark { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public bool BDel { get; set; }
}
