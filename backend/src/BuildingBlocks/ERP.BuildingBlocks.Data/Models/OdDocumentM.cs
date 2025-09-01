using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class OdDocumentM
{
    public int Lid { get; set; }

    public string DocumentName { get; set; } = null!;

    public string? SCode { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public bool Bdel { get; set; }

    public DateTime? UpdDate { get; set; }

    public int? UpdUser { get; set; }
}
