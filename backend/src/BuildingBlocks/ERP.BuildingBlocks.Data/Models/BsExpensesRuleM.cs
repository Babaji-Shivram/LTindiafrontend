using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsExpensesRuleM
{
    public int LId { get; set; }

    public int ExpenseId { get; set; }

    public int BranchId { get; set; }

    public int Lmode { get; set; }

    public int MaxAmount { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public bool BDel { get; set; }
}
