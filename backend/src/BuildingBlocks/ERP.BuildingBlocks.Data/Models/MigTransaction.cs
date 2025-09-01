using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class MigTransaction
{
    public double? Sl { get; set; }

    public string? ReqReferenceNo { get; set; }

    public string? RespReferenceNo { get; set; }

    public string? UniqueReferenceNo { get; set; }

    public string? RespStatus { get; set; }

    public double? Amount { get; set; }

    public DateTime? ReqDate { get; set; }

    public DateTime? RespDate { get; set; }

    public string? Status { get; set; }

    public string? Utr { get; set; }

    public string? JobNo { get; set; }
}
