using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsJobExpenseHistory
{
    public int Lid { get; set; }

    public int ExpenseId { get; set; }

    public int StatusId { get; set; }

    public string Remark { get; set; } = null!;

    public bool IsActive { get; set; }

    public bool IsFinal { get; set; }

    public int UserId { get; set; }

    public DateTime DtDate { get; set; }

    public bool BDel { get; set; }
}
