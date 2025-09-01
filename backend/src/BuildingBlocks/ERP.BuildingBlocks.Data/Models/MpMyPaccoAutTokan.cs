using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class MpMyPaccoAutTokan
{
    public int Lid { get; set; }

    public int? Apiid { get; set; }

    public string AuthTokan { get; set; } = null!;

    public DateTime ValidTillDate { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public bool BDel { get; set; }
}
