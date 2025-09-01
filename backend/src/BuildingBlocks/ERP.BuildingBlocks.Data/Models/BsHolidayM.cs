using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsHolidayM
{
    public int Lid { get; set; }

    public string SName { get; set; } = null!;

    public DateTime HolidayDate { get; set; }

    public int BranchId { get; set; }

    public int? FinYearId { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public bool BDel { get; set; }
}
