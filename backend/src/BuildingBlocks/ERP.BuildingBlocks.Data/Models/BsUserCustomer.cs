using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsUserCustomer
{
    public int LId { get; set; }

    public int UserId { get; set; }

    public int CustomerId { get; set; }

    public int? LUser { get; set; }

    public bool BDel { get; set; }

    public DateTime DtDate { get; set; }
}
