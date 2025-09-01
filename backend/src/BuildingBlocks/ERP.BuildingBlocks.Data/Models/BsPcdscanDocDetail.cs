using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsPcdscanDocDetail
{
    public long Lid { get; set; }

    public int? JobId { get; set; }

    public int? Pcddocid { get; set; }

    public int? LUser { get; set; }

    public DateTime? Dtdate { get; set; }

    public int? Bdel { get; set; }
}
