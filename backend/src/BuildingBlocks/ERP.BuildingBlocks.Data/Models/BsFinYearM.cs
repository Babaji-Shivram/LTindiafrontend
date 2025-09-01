using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsFinYearM
{
    public int LId { get; set; }

    public DateOnly StartDate { get; set; }

    public DateOnly EndDate { get; set; }

    public string? YearPrefix { get; set; }

    public DateTime DtDate { get; set; }

    public bool BDel { get; set; }
}
