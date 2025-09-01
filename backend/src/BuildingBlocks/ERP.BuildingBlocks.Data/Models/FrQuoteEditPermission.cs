using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class FrQuoteEditPermission
{
    public int LId { get; set; }

    public int? EnqId { get; set; }

    public bool? IsEnabled { get; set; }

    public int? EnabledBy { get; set; }

    public DateTime? EnabledDate { get; set; }

    public DateTime? ExpirationDate { get; set; }

    public bool? BDel { get; set; }
}
