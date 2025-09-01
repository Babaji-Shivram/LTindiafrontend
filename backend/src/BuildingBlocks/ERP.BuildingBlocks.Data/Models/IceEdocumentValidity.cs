using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class IceEdocumentValidity
{
    public int Lid { get; set; }

    public int JobId { get; set; }

    public int SbId { get; set; }

    public string DocumentVersion { get; set; } = null!;

    public string? DocumentDescription { get; set; }

    public string? Validity { get; set; }

    public bool BDel { get; set; }

    public DateTime DtDate { get; set; }

    public DateTime? UpdDate { get; set; }
}
