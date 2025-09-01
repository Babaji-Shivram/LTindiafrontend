using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class MigUtr
{
    public string? Systemref { get; set; }

    public string? Vchno { get; set; }

    public DateTime? Billdate { get; set; }

    public string? Ref { get; set; }

    public string? ParCode { get; set; }

    public string? ChequeNo { get; set; }
}
