using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class MsPcdbillingAdvice
{
    public int LId { get; set; }

    public int JobId { get; set; }

    public bool? ApprovalStatus { get; set; }

    public string? Instructions { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public bool BDel { get; set; }

    public int? ModuleId { get; set; }
}
