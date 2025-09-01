using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class IceUserEmail
{
    public int LId { get; set; }

    public string SEmail { get; set; } = null!;

    public string SCode { get; set; } = null!;

    public string PortCodes { get; set; } = null!;

    public string PortNames { get; set; } = null!;

    public int? LOrder { get; set; }

    public string? EmailReadTimestamp { get; set; }

    public DateTime? EmailReadDate { get; set; }

    public bool IsActive { get; set; }

    public bool BDel { get; set; }

    public DateTime DtDate { get; set; }
}
