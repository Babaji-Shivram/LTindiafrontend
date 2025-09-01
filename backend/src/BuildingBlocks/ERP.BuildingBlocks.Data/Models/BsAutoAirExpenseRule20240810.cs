using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsAutoAirExpenseRule20240810
{
    public int LId { get; set; }

    public string SName { get; set; } = null!;

    public string? ReportHeading { get; set; }

    public int? RmsnonRms { get; set; }

    public int Charges { get; set; }

    public int MaxPayable { get; set; }

    public string Description { get; set; } = null!;

    public int LType { get; set; }

    public bool IsStandardRequired { get; set; }

    public int? CustomerId { get; set; }

    public int? OldCharges { get; set; }

    public string? Remark { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public DateTime? UpdDate { get; set; }

    public bool BDel { get; set; }
}
