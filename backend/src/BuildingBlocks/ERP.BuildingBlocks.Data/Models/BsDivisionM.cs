using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsDivisionM
{
    public int LId { get; set; }

    public string DivisionName { get; set; } = null!;

    public string? DivisionCode { get; set; }

    public string? SRemarks { get; set; }

    public int? LUser { get; set; }

    public DateTime DtDate { get; set; }

    public bool BDel { get; set; }
}
