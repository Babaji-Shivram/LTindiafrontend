using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsQuotationStatusHistory
{
    public int Lid { get; set; }

    public int? QuotationId { get; set; }

    public int? StatusId { get; set; }

    public string? Remark { get; set; }

    public bool IsActive { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public bool BDel { get; set; }

    public DateTime? TargetDate { get; set; }
}
