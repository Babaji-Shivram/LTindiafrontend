using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class FrDocument
{
    public int LId { get; set; }

    public int EnqId { get; set; }

    public int? DocId { get; set; }

    public string? DocName { get; set; }

    public string? DocPath { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public bool BDel { get; set; }
}
