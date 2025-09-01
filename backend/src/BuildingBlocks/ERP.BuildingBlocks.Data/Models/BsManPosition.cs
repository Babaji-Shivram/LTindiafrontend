using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsManPosition
{
    public int Lid { get; set; }

    public int ReqId { get; set; }

    public string? PosReqFor { get; set; }

    public string? PosReportTo { get; set; }

    public string? SalaryRange { get; set; }

    public string? MinQualif { get; set; }

    public int? LUser { get; set; }

    public DateOnly? DtDate { get; set; }

    public int? UpdUser { get; set; }

    public DateOnly? UpdDate { get; set; }

    public string? BDel { get; set; }
}
