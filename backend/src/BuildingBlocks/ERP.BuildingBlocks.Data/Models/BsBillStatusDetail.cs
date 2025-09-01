using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsBillStatusDetail
{
    public long Lid { get; set; }

    public int JobId { get; set; }

    public int BillStatusId { get; set; }

    public string Remark { get; set; } = null!;

    public bool IsActive { get; set; }

    public int LUser { get; set; }

    public bool BDel { get; set; }

    public DateTime DtDate { get; set; }
}
