using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsPcddetail
{
    public int LId { get; set; }

    public int JobId { get; set; }

    public string? DispatchLocation { get; set; }

    public DateTime? DispatchDeptDate { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public bool BDel { get; set; }
}
