using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class TrTransportVendor
{
    public int Lid { get; set; }

    public string SName { get; set; } = null!;

    public int CityId { get; set; }

    public int LUser { get; set; }

    public bool BDel { get; set; }

    public DateTime DtDate { get; set; }
}
