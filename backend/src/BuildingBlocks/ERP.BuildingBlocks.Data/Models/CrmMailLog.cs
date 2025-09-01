using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class CrmMailLog
{
    public int? Lid { get; set; }

    public string? EmailTo { get; set; }

    public string? EmailCc { get; set; }

    public string? EmailBcc { get; set; }

    public string? EmailBody { get; set; }
}
