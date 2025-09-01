using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class TrContainerDetail
{
    public int LId { get; set; }

    public int JobId { get; set; }

    public string ContainerNo { get; set; } = null!;

    public int ContainerSize { get; set; }

    /// <summary>
    /// 1 For FCL, 2 For LCL
    /// </summary>
    public int ContainerType { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public DateTime? UpdDate { get; set; }

    public int? UpdUser { get; set; }

    public bool BDel { get; set; }
}
