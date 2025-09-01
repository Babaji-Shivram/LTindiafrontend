using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class TrMaintenanceWorkShadow
{
    public long AuditId { get; set; }

    public long Lid { get; set; }

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

    public string AuditAction { get; set; } = null!;

    public DateTime AuditDate { get; set; }

    public string AuditUser { get; set; } = null!;

    public string? AuditApp { get; set; }
}
