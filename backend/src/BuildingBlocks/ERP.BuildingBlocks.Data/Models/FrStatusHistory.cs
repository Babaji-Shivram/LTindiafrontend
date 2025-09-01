using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class FrStatusHistory
{
    public int LId { get; set; }

    public int EnqId { get; set; }

    public int LStatus { get; set; }

    public DateOnly StatusDate { get; set; }

    public bool IsActive { get; set; }

    public string? Remarks { get; set; }

    public int LUser { get; set; }

    public bool BDel { get; set; }

    public DateTime DtDate { get; set; }
}
