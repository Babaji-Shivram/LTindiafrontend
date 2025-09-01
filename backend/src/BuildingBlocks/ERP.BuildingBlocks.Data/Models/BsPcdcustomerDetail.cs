using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsPcdcustomerDetail
{
    public int LId { get; set; }

    public int JobId { get; set; }

    public bool PcdtoCustomer { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public bool BDel { get; set; }
}
