using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class FopCargoArrivalDetail
{
    public long LId { get; set; }

    public int EnqId { get; set; }

    public string? Igmno { get; set; }

    public DateTime? Igmdate { get; set; }

    public string? ItemNo { get; set; }

    public DateTime? Atadate { get; set; }

    public bool? CancopyUploaded { get; set; }

    public bool? EmailSent { get; set; }

    public string? EmailTo { get; set; }

    public DateTime? EmailSentDate { get; set; }

    public decimal? TotalAmount { get; set; }

    public decimal? Amount { get; set; }

    public decimal? Tax { get; set; }

    public bool IsGst { get; set; }

    public string? Remark { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public int? UpdUser { get; set; }

    public DateTime? UpdDate { get; set; }

    public bool BDel { get; set; }
}
