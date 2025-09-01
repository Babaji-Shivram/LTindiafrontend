using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsWareHouseM
{
    public int Lid { get; set; }

    public string SName { get; set; } = null!;

    public string? Code { get; set; }

    public string? SAddress { get; set; }

    public string? ContactName { get; set; }

    public string? ContactNumber { get; set; }

    public string? EmailId { get; set; }

    public bool BStatus { get; set; }

    public int LType { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public bool BDel { get; set; }
}
