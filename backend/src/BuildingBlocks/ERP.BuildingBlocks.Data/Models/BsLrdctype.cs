using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsLrdctype
{
    public long Lid { get; set; }

    public string? Lrdctype { get; set; }

    public int? Bdel { get; set; }

    public DateTime? Dtdate { get; set; }
}
