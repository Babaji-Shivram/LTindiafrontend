using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class CmBackOfficeDocument
{
    public int Lid { get; set; }

    public int JobId { get; set; }

    public int DocId { get; set; }

    public string? DocPath { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public int? UpdUser { get; set; }

    public DateTime? UpdDate { get; set; }

    public bool BDel { get; set; }
}
