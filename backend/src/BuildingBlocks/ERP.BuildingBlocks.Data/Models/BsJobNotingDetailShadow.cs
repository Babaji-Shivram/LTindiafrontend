using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsJobNotingDetailShadow
{
    public long AuditId { get; set; }

    public int LId { get; set; }

    public int JobId { get; set; }

    public string? Boeno { get; set; }

    public DateOnly? Boedate { get; set; }

    public int? RmsnonRms { get; set; }

    public int? BegroupId { get; set; }

    public string? ModeOfBe { get; set; }

    public bool? IsBeprovisional { get; set; }

    public int? BeprovisionalType { get; set; }

    public bool? ProvisionalStatus { get; set; }

    public string? Iecno { get; set; }

    public string? FirstCheckStatus { get; set; }

    public string? PriorBestatus { get; set; }

    public string? Sec48status { get; set; }

    public string? IceBetype { get; set; }

    public int? CustomsStatgeId { get; set; }

    public string? Remark { get; set; }

    public int? BefromSourceId { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public int? UpdUser { get; set; }

    public DateTime? UpdDate { get; set; }

    public bool BDel { get; set; }

    public string AuditAction { get; set; } = null!;

    public DateTime AuditDate { get; set; }

    public string AuditUser { get; set; } = null!;

    public string? AuditApp { get; set; }
}
