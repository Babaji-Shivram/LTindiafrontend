using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class ImsItemTypeM
{
    public int Lid { get; set; }

    public string SName { get; set; } = null!;

    public int LUser { get; set; }

    public DateTime Dtdate { get; set; }

    public int? UpdUser { get; set; }

    public DateTime? UpdDate { get; set; }

    public bool Bdel { get; set; }
}
