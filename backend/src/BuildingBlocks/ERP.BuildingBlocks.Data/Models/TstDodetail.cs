using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class TstDodetail
{
    public long LId { get; set; }

    public int EnqId { get; set; }

    public string Chaname { get; set; } = null!;

    public int PaymentTerm { get; set; }

    public string DoissuedTo { get; set; } = null!;

    public int PaymentTypeId { get; set; }

    public string? ChequeNo { get; set; }

    public DateOnly? ChequeDate { get; set; }

    public decimal? Doamount { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public int? UpdUser { get; set; }

    public DateTime? UpdDate { get; set; }

    public bool BDel { get; set; }
}
