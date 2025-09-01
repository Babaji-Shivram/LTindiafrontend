using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class KtCircularDoc
{
    public int Lid { get; set; }

    public int CircularMailId { get; set; }

    public string DocPath { get; set; } = null!;

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public bool BDel { get; set; }
}
