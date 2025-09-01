using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsPcdscanDocumentM
{
    public long Lid { get; set; }

    public string? SName { get; set; }

    public string? SRemark { get; set; }

    public int? LUser { get; set; }

    public DateTime? Dtdate { get; set; }

    public int? Bdel { get; set; }
}
