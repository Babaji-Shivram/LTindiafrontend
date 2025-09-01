using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class TempDow
{
    public int Lid { get; set; }

    public int? JobId { get; set; }

    public string? BsjobNo { get; set; }

    public double? CustRefNo { get; set; }

    public string? Consignee { get; set; }

    public DateTime? Eta { get; set; }

    public string? Betype { get; set; }

    public string? Remark { get; set; }

    public string? Port { get; set; }
}
