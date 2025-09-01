using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class CrmUserReporting
{
    public int Lid { get; set; }

    public int UserId { get; set; }

    public int ReportingUserId { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public bool BDel { get; set; }
}
