using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsTestSeaBanglore
{
    public long Lid { get; set; }

    public long JobId { get; set; }

    public long DeliveryId { get; set; }

    public int AutoExpenseId { get; set; }

    public int ContainerId { get; set; }

    public int PaidCharges { get; set; }

    /// <summary>
    /// 1 For Port To Customer, 2 For Port To Warehouse
    /// </summary>
    public int ExpenseFor { get; set; }

    public string? LicenseType { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public DateTime UpdDate { get; set; }

    public bool BDel { get; set; }
}
