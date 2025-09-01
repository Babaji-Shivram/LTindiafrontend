using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsAppUserAlibaba
{
    public int Lid { get; set; }

    public string UName { get; set; } = null!;

    public string UPhNo { get; set; } = null!;

    public string UEmail { get; set; } = null!;

    public DateTime? DtDate { get; set; }
}
