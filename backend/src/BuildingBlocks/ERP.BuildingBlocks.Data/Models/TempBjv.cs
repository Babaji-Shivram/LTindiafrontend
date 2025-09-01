using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class TempBjv
{
    public string? JobRefNo { get; set; }

    public string? Ay { get; set; }

    public string? Type { get; set; }

    public double? Billno { get; set; }

    public DateTime? Billdate { get; set; }

    public string? Vchno { get; set; }

    public string? ParCode { get; set; }

    public string? ParName { get; set; }

    public string? Ref { get; set; }

    public double? Amount { get; set; }

    public string? Otherdt { get; set; }

    public double? Recamt { get; set; }

    public double? Agency { get; set; }

    public double? Servtax { get; set; }
}
