using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsPreAlertDocPath
{
    public int LId { get; set; }

    public int JobId { get; set; }

    public string? DocPath { get; set; }

    public string? FileName { get; set; }

    public int DocType { get; set; }

    public int? IsMobile { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public bool BDel { get; set; }

    public DateTime? UpdDate { get; set; }

    public int? UpdUser { get; set; }
}
