using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsHoldBillingAdvice
{
    public int Lid { get; set; }

    public int JobId { get; set; }

    public bool IsHolded { get; set; }

    public string? Remark { get; set; }

    public bool IsActive { get; set; }

    public int? RejectType { get; set; }

    public int? ModuleId { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public bool BDel { get; set; }
}
