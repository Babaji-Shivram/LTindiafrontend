using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class KpimOperator
{
    public int Lid { get; set; }

    public string? Sname { get; set; }

    public int? Bdel { get; set; }

    public int? Luser { get; set; }

    public DateTime? DtDate { get; set; }
}
