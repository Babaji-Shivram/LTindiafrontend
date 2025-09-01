using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class InvTdsexemptM
{
    public int Lid { get; set; }

    public string SName { get; set; } = null!;

    public string SCode { get; set; } = null!;

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public bool Bdel { get; set; }

    public int? UpdUser { get; set; }

    public DateTime? UpdDate { get; set; }
}
