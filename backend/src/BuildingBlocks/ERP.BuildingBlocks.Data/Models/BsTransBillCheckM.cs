using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsTransBillCheckM
{
    public int Lid { get; set; }

    public int JobId { get; set; }

    public int ModuleId { get; set; }

    public DateTime TransBillCheckDate { get; set; }

    public DateTime DtDate { get; set; }
}
