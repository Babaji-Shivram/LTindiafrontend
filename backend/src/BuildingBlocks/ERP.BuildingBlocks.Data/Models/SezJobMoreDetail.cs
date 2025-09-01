using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class SezJobMoreDetail
{
    public int Lid { get; set; }

    public int JobId { get; set; }

    public bool? Discount { get; set; }

    public bool? ReImport { get; set; }

    public bool? PrevImport { get; set; }

    public string? Currency { get; set; }

    public string? SchemeCode { get; set; }

    public bool? PrevExpGoods { get; set; }

    public bool? CessDetail { get; set; }

    public bool? LicenceRegNo { get; set; }

    public bool? ReExport { get; set; }

    public bool? PrevExport { get; set; }

    public DateTime DtDate { get; set; }

    public int UpdUser { get; set; }

    public int LUser { get; set; }

    public DateTime UpdDate { get; set; }

    public bool BDel { get; set; }
}
