using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class ImsItemDetail
{
    public int Lid { get; set; }

    public int TypeId { get; set; }

    public string SName { get; set; } = null!;

    public long? BalQuntity { get; set; }

    public int? LUser { get; set; }

    public DateTime DtDate { get; set; }

    public int? UpdUser { get; set; }

    public DateTime? UpdDate { get; set; }

    public bool? Bdel { get; set; }
}
