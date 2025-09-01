using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class AcPaymentExpense
{
    public int Lid { get; set; }

    public int PaymentId { get; set; }

    public int AccodeId { get; set; }

    public int? JobId { get; set; }

    public decimal? Debit { get; set; }

    public decimal? Credit { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public int? UpdUser { get; set; }

    public DateTime? UpdDate { get; set; }

    public bool BDel { get; set; }
}
