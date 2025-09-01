using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsCustomerConsignee
{
    public int LId { get; set; }

    public int CustomerId { get; set; }

    public int ConsigneeId { get; set; }

    public int? ConsigneeIdOld { get; set; }

    public int? CompanyId { get; set; }

    public int LUserId { get; set; }

    public DateTime DtDate { get; set; }

    public bool BDel { get; set; }
}
