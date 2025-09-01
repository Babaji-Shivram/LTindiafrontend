using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class IcePort
{
    public int Lid { get; set; }

    public int? PortId { get; set; }

    public string? PortCode { get; set; }

    public string? IcePortName { get; set; }

    public DateTime DtDate { get; set; }

    public bool BDel { get; set; }
}
