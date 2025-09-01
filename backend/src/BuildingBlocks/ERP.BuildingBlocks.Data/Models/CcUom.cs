using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class CcUom
{
    public int Lid { get; set; }

    public string SName { get; set; } = null!;

    public string SCode { get; set; } = null!;

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public bool Bdel { get; set; }
}
