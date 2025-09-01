using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsReasonforPendencyM
{
    public long? Lid { get; set; }

    public string? ReasonforPendency { get; set; }

    public DateTime? DtDate { get; set; }

    public int? Bdel { get; set; }
}
