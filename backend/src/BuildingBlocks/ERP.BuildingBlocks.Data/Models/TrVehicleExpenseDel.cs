using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class TrVehicleExpenseDel
{
    public long Lid { get; set; }

    public int VehicleId { get; set; }

    public string VehicleNo { get; set; } = null!;

    public DateOnly? ExpenseDate { get; set; }

    public int ExpenseCategory { get; set; }

    public decimal? ExpenseAmount { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public int? UpdUser { get; set; }

    public DateTime? UpdDate { get; set; }

    public bool BDel { get; set; }
}
