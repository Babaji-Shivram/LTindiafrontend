using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class FopCustomerM
{
    public int Lid { get; set; }

    public string SName { get; set; } = null!;

    public string? SAddress { get; set; }

    public int? CustomerId { get; set; }

    public int? LUser { get; set; }

    public DateTime DtDate { get; set; }

    public bool BDel { get; set; }
}
