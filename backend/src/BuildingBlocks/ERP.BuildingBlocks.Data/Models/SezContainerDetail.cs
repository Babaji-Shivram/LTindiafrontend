using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class SezContainerDetail
{
    public int Contid { get; set; }

    public int JobId { get; set; }

    public string ContainerNo { get; set; } = null!;

    public int ContainerSize { get; set; }

    public int ContainerType { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public DateTime? UpdDate { get; set; }

    public int? UpdUser { get; set; }

    public bool BDel { get; set; }
}
