using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsCustomerBranch
{
    public int Lid { get; set; }

    public int? Customerid { get; set; }

    public int? Branchid { get; set; }

    public int? Luser { get; set; }

    public int? Bdel { get; set; }

    public DateTime? Dtdate { get; set; }
}
