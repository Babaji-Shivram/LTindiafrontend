using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class AcApiglobalId
{
    public int Lid { get; set; }

    public int RequestId { get; set; }

    public string TransactionId { get; set; } = null!;

    public DateTime DtDate { get; set; }
}
