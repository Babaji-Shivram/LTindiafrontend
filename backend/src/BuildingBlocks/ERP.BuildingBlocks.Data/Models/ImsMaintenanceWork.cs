using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class ImsMaintenanceWork
{
    public int Lid { get; set; }

    public DateTime WorkDate { get; set; }

    public int BranchId { get; set; }

    public string? WorkDesc { get; set; }

    public string? BillNumber { get; set; }

    public string? PaidTo { get; set; }

    public int PayTypeId { get; set; }

    public DateTime? BillPaidDate { get; set; }

    public int FinYear { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public bool BDel { get; set; }
}
