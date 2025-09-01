using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class TempHalliburtonDoc
{
    public int Lid { get; set; }

    public int JobId { get; set; }

    public int? DocId { get; set; }

    public int? DocType { get; set; }

    public string? DocPath { get; set; }

    public bool? IsSuccess { get; set; }

    public DateTime? DtDate { get; set; }
}
