using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class TrBillRequestDetail
{
    public long Lid { get; set; }

    public int JobId { get; set; }

    public int StatusId { get; set; }

    public int RequestBy { get; set; }

    public DateTime ReuqestDate { get; set; }

    public int? ApprovedBy { get; set; }

    public DateTime? ApprovedDate { get; set; }

    public string? Remark { get; set; }

    public bool IsActive { get; set; }

    public bool BDel { get; set; }

    public DateTime DtDate { get; set; }
}
