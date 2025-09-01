using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsJobNotingDetail
{
    public int LId { get; set; }

    public int JobId { get; set; }

    public string? Boeno { get; set; }

    public DateOnly? Boedate { get; set; }

    /// <summary>
    /// 1 for RMS, 2 For Non-RMS
    /// </summary>
    public int? RmsnonRms { get; set; }

    public int? BegroupId { get; set; }

    public string? ModeOfBe { get; set; }

    public bool? IsBeprovisional { get; set; }

    /// <summary>
    /// 1- SVB, 2- Rexport Bond cancellation
    /// </summary>
    public int? BeprovisionalType { get; set; }

    public bool? ProvisionalStatus { get; set; }

    public string? Iecno { get; set; }

    public string? FirstCheckStatus { get; set; }

    /// <summary>
    /// N.A.,N -Normal,A -Advance,Y - Prior,C - Prior To Final
    /// </summary>
    public string? PriorBestatus { get; set; }

    public string? Sec48status { get; set; }

    public string? IceBetype { get; set; }

    /// <summary>
    /// Key - ICE_CustomsStageMS, History Table - BS_JobCustomsStage
    /// </summary>
    public int? CustomsStatgeId { get; set; }

    public string? Svbno { get; set; }

    public DateTime? Svbdate { get; set; }

    public string? Remark { get; set; }

    /// <summary>
    /// 0 - User, 1 - 4Soft, 2 - Auto Fetch From Web
    /// </summary>
    public int? BefromSourceId { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public int? UpdUser { get; set; }

    public DateTime? UpdDate { get; set; }

    public bool BDel { get; set; }

    public virtual ICollection<BsTruncatePreventKey> BsTruncatePreventKeys { get; set; } = new List<BsTruncatePreventKey>();
}
