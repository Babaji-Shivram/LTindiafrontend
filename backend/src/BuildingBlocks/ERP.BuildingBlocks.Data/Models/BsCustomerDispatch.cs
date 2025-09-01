using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsCustomerDispatch
{
    public int Lid { get; set; }

    public int CustomerId { get; set; }

    public bool? IsDispatch { get; set; }

    public bool? IsEbill { get; set; }

    public bool? IsPortal { get; set; }

    public int Luser { get; set; }

    public DateTime Dtdate { get; set; }

    public DateTime? UpdDate { get; set; }

    public int? UpdUser { get; set; }
}
