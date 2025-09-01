using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsChekListDocTypeM
{
    public int Lid { get; set; }

    public string DocType { get; set; } = null!;

    public string? SRemarks { get; set; }

    public int? LUserId { get; set; }

    public int? Ldate { get; set; }

    public DateTime? DtDate { get; set; }

    public bool BDel { get; set; }
}
