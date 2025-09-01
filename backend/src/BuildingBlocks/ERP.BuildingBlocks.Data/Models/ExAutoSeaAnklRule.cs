using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class ExAutoSeaAnklRule
{
    public int Lid { get; set; }

    public string SName { get; set; } = null!;

    public string ReportHeading { get; set; } = null!;

    public string Category { get; set; } = null!;

    public int ExportType { get; set; }

    public int? LType { get; set; }

    public bool? IsStandardApplicable { get; set; }

    public int? Con20 { get; set; }

    public int? Con40 { get; set; }

    public int? Lcl { get; set; }

    public int? FixCharges { get; set; }

    public bool? PayPerCont { get; set; }

    public string? Remark { get; set; }

    public DateTime DtDate { get; set; }

    public DateTime? UpdDate { get; set; }

    public bool BDel { get; set; }
}
