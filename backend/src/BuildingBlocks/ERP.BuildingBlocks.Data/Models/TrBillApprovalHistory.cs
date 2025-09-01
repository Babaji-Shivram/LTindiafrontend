using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class TrBillApprovalHistory
{
    public int Lid { get; set; }

    public int TransBillId { get; set; }

    public int? IsApproved { get; set; }

    public string? Remark { get; set; }

    public bool IsActive { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public bool BDel { get; set; }
}
