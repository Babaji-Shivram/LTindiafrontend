using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsDeptM
{
    public int Lid { get; set; }

    public string DeptName { get; set; } = null!;

    public string? DeptCode { get; set; }

    public string? SRemarks { get; set; }

    public int? LUserId { get; set; }

    public DateTime DtDate { get; set; }

    public bool BDel { get; set; }
}
