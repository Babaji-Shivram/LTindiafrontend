using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class LtCbInvDet
{
    public int Invdetid { get; set; }

    public int? Invmstid { get; set; }

    public string? TxtChargecode { get; set; }

    public string? DdlParticular { get; set; }

    public double? TxtRate { get; set; }

    public double? TxtQty { get; set; }

    public double? TxtAmt { get; set; }

    public int? LineSeq { get; set; }
}
