using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class TrMaintenanceEmp
{
    public int Lid { get; set; }

    public int MaintanceId { get; set; }

    public int EmpId { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public bool BDel { get; set; }
}
