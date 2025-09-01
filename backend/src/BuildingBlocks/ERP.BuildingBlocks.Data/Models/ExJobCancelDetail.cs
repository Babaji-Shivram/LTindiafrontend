using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class ExJobCancelDetail
{
    public int Lid { get; set; }

    public int JobId { get; set; }

    public int StatusId { get; set; }

    public string? Remark { get; set; }

    public string? Reason { get; set; }

    public int FinYear { get; set; }

    public int ModuleId { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public bool BDel { get; set; }
}
