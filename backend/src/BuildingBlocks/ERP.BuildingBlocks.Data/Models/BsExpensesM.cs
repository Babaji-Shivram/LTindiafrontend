using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsExpensesM
{
    public int LId { get; set; }

    public string ExpenseName { get; set; } = null!;

    public string? Remark { get; set; }

    public int LPrevId { get; set; }

    public int ModuleId { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public bool BDel { get; set; }
}
