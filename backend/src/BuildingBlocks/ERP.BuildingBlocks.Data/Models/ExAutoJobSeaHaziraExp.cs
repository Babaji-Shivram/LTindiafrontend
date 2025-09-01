using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class ExAutoJobSeaHaziraExp
{
    public long LId { get; set; }

    public long JobId { get; set; }

    public int AutoExpenseId { get; set; }

    public int? ContainerCount { get; set; }

    public int? PaidCharges { get; set; }

    public int? LUser { get; set; }

    public DateTime DtDate { get; set; }

    public DateTime? UpdDate { get; set; }

    public bool BDel { get; set; }
}
