using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BjvJobAmount
{
    public long Lid { get; set; }

    public int JobId { get; set; }

    public decimal? Debitamt { get; set; }

    public decimal? Creditamt { get; set; }

    public decimal? Amount { get; set; }

    public int? ModuleId { get; set; }

    public DateTime? DtDate { get; set; }

    public bool? BDel { get; set; }
}
