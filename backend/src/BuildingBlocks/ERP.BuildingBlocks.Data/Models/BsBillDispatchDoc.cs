using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;
public partial class BsBillDispatchDoc
{
    public int Lid { get; set; }

    public int? PreId { get; set; }

    public int? JobId { get; set; }

    public int? BillId { get; set; }

    public string? DocPath { get; set; }

    public string? FileName { get; set; }

    public int? DocType { get; set; }

    public int? LUser { get; set; }

    public DateTime DtDate { get; set; }

    public int? UpdUser { get; set; }

    public DateTime? UpdDate { get; set; }

    public bool Bdel { get; set; }
}
