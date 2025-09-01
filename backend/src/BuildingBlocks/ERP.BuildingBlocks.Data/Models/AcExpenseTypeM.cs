using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class AcExpenseTypeM
{
    public int Lid { get; set; }

    public string SName { get; set; } = null!;

    public string ChargeCode { get; set; } = null!;

    public int? CatgId { get; set; }

    public string? CatgName { get; set; }

    public string? Hsncode { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public bool BDel { get; set; }
}
