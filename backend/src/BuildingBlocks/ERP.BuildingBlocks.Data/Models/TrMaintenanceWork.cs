using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class TrMaintenanceWork
{
    public int Lid { get; set; }

    public DateTime WorkDate { get; set; }

    public DateTime WorkDateEnd { get; set; }

    public TimeOnly StartTime { get; set; }

    public TimeOnly? EndTime { get; set; }

    public int? VehicleId { get; set; }

    public string? WorkDesc { get; set; }

    public string? WorkLocation { get; set; }

    public string? BillNumber { get; set; }

    public string? PaidTo { get; set; }

    public string? SupportBillPaidTo { get; set; }

    public int PayTypeId { get; set; }

    public DateTime? BillPaidDate { get; set; }

    public bool? IsMistake { get; set; }

    public int FinYear { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public bool BDel { get; set; }

    public virtual ICollection<BsTruncatePreventKey> BsTruncatePreventKeys { get; set; } = new List<BsTruncatePreventKey>();

    public virtual ICollection<TrMaintenanceExpense> TrMaintenanceExpenses { get; set; } = new List<TrMaintenanceExpense>();
}
