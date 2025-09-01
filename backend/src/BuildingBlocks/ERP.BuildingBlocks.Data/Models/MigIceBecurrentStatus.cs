using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class MigIceBecurrentStatus
{
    public int Lid { get; set; }

    public int Beid { get; set; }

    public string? Boeno { get; set; }

    public DateTime? Boedate { get; set; }

    /// <summary>
    /// 1 - RMS, 2 - Non-RMS
    /// </summary>
    public int? Appraisement { get; set; }

    public string? CurrentQueue { get; set; }

    public DateTime? ApprDate { get; set; }

    public DateTime? AssessDate { get; set; }

    public DateTime? PaymentDate { get; set; }

    public DateTime? ExamDate { get; set; }

    public DateTime? OocDate { get; set; }

    public DateTime DtDate { get; set; }

    public bool BDel { get; set; }

    public DateTime? UpdDate { get; set; }
}
