using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsChekListDocDetail
{
    public int Lid { get; set; }

    public string DocumentName { get; set; } = null!;

    public int DocType { get; set; }

    public int? ModuleId { get; set; }

    public string? SCode { get; set; }

    public string? SRemarks { get; set; }

    public int? LUser { get; set; }

    public DateTime DtDate { get; set; }

    public bool BDel { get; set; }
}
