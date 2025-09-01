using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsTradeLaneM
{
    public int Lid { get; set; }

    public string? TradeLaneName { get; set; }

    public int? CountryId { get; set; }

    public string? Scode { get; set; }

    public int? LUser { get; set; }

    public DateTime? DtDate { get; set; }

    public DateTime? UpdDate { get; set; }

    public int? UpdUser { get; set; }

    public int? Bdel { get; set; }
}
