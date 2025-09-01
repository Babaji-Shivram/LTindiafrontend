using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class ExJobFilingDetail
{
    public int Lid { get; set; }

    public int JobId { get; set; }

    public string Sbno { get; set; } = null!;

    public DateOnly Sbdate { get; set; }

    public int MarkAppraising { get; set; }

    public DateOnly? CartingDate { get; set; }

    public DateOnly? MarkPassingDate { get; set; }

    public DateOnly? RegisterationDate { get; set; }

    public DateOnly? ExamineDate { get; set; }

    public DateOnly? ExamineReportDate { get; set; }

    public DateOnly? Leodate { get; set; }

    public string? Remark { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public int? UpdUser { get; set; }

    public DateTime? UpdDate { get; set; }

    public bool BDel { get; set; }
}
