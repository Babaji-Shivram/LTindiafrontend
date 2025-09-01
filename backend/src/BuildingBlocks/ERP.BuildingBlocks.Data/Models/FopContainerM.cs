using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class FopContainerM
{
    public int LId { get; set; }

    public int EnqId { get; set; }

    public string ContainerNo { get; set; } = null!;

    public int ContainerSize { get; set; }

    public int ContainerType { get; set; }

    public string? LineSealNo { get; set; }

    public string? CustomSealNo { get; set; }

    public string? RfidsealNo { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public DateTime? UpdDate { get; set; }

    public int? UpdUser { get; set; }

    public bool BDel { get; set; }
}
