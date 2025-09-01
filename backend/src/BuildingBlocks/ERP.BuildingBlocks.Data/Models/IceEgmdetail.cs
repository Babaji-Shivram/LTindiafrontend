using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class IceEgmdetail
{
    public int Lid { get; set; }

    public int JobId { get; set; }

    public int SbId { get; set; }

    public string EgmNo { get; set; } = null!;

    public string? EgmDate { get; set; }

    public string? ContainerNo { get; set; }

    public string? SealNo { get; set; }

    public string? ErrorMsg { get; set; }

    public bool BDel { get; set; }

    public DateTime DtDate { get; set; }

    public DateTime? UpdDate { get; set; }
}
