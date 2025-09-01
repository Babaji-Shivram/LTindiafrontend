using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class IceCustomsStageM
{
    public int Lid { get; set; }

    public string RoleName { get; set; } = null!;

    public string? Description { get; set; }

    public string? Remark { get; set; }

    public bool Bdel { get; set; }

    public DateTime DtDate { get; set; }
}
