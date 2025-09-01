using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsElrcustomer
{
    public int LId { get; set; }

    public int CustomerId { get; set; }

    public string? CustName { get; set; }

    public string? SRemark { get; set; }

    public int? LUser { get; set; }

    public DateTime? DtDate { get; set; }

    public DateTime? UpdDate { get; set; }

    public int? UpdUser { get; set; }

    public bool Bdel { get; set; }
}
