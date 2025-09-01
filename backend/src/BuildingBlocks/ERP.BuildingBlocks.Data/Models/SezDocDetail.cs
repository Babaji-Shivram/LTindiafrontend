using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class SezDocDetail
{
    public int LId { get; set; }

    public int JobId { get; set; }

    public string JobRefNo { get; set; } = null!;

    public int? DocType { get; set; }

    public string? DocPath { get; set; }

    public string? FileName { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public bool BDel { get; set; }
}
