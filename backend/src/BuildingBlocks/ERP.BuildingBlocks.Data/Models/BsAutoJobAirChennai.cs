using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;
public partial class BsAutoJobAirChennai
{
    public int LId { get; set; }

    public int JobId { get; set; }

    public int AutoExpenseId { get; set; }

    public int Charges { get; set; }

    /// <summary>
    /// 1 For Customer 2 For Warehouse
    /// </summary>
    public int? ExpenseFor { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public DateTime? UpdDate { get; set; }

    public bool BDel { get; set; }
}
