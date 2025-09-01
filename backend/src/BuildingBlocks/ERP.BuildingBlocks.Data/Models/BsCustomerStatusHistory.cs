using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsCustomerStatusHistory
{
    public int Lid { get; set; }

    public int CustomerId { get; set; }

    public string Remark { get; set; } = null!;

    public int StatusId { get; set; }

    public bool IsActive { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public bool BDel { get; set; }
}
