using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class CrmContactDoc
{
    public int Lid { get; set; }

    public string DocName { get; set; } = null!;

    public string? DocPath { get; set; }

    public int? ContactId { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public bool BDel { get; set; }
}
