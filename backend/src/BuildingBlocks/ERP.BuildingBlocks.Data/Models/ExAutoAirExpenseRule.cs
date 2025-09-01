using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class ExAutoAirExpenseRule
{
    public int Lid { get; set; }

    public string SName { get; set; } = null!;

    public string ReportHeading { get; set; } = null!;

    public int ShippingBillType { get; set; }

    public int ExportType { get; set; }

    public int? LType { get; set; }

    public bool? IsStandardApplicable { get; set; }

    public int? Charges { get; set; }

    public bool? PayPerPkg { get; set; }

    public int? CustomerId { get; set; }

    public string? Remark { get; set; }

    public DateTime DtDate { get; set; }

    public DateTime? UpdDate { get; set; }

    public bool? BDel { get; set; }
}
