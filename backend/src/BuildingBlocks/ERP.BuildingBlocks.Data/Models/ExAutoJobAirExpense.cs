using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class ExAutoJobAirExpense
{
    public long LId { get; set; }

    public long JobId { get; set; }

    public int ExpenseId { get; set; }

    public int? PaidAmount { get; set; }

    /// <summary>
    /// 1 For Babaji 2 For Customer
    /// </summary>
    public int TransportBy { get; set; }

    public int? LUser { get; set; }

    public DateTime DtDate { get; set; }

    public DateTime? UpdDate { get; set; }

    public bool BDel { get; set; }
}
