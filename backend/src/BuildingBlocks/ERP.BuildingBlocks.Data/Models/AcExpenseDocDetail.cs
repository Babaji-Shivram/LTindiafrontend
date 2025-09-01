using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class AcExpenseDocDetail
{
    public int Lid { get; set; }

    public int? PaymentId { get; set; }

    public int? DocumentId { get; set; }

    public string? DocPath { get; set; }

    public string? FileName { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public int? UpdUser { get; set; }

    public DateTime? UpdDate { get; set; }

    public bool BDel { get; set; }
}
