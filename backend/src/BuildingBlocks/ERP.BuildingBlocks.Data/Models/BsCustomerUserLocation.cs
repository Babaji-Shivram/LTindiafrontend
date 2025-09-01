using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsCustomerUserLocation
{
    public int LId { get; set; }

    public int CustUserId { get; set; }

    public int LocationId { get; set; }

    public int LTypeId { get; set; }

    public int LUser { get; set; }

    public bool BDel { get; set; }

    public DateTime DtDate { get; set; }
}
