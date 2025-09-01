using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class AcPaymentStatus
{
    public int Lid { get; set; }

    public int? PaymentId { get; set; }

    public int? StatusId { get; set; }

    public string? Remark { get; set; }

    public bool IsActive { get; set; }

    public bool? IsFinal { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public bool BDel { get; set; }
}
