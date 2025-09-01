using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;
public partial class BsAutoSeaChennaiRuleShadow
{
    public long AuditId { get; set; }

    public int LId { get; set; }

    public string SName { get; set; } = null!;

    public string ReportHeading { get; set; } = null!;

    public bool Rms { get; set; }

    public bool NonRms { get; set; }

    public int? DeliveryTypeId { get; set; }

    public int JobTypeId { get; set; }

    public int? MinContainer { get; set; }

    public int? MaxContainer { get; set; }

    public int PackageType { get; set; }

    public int LType { get; set; }

    public bool IsStandardApplicable { get; set; }

    public int Con20 { get; set; }

    public int Con40 { get; set; }

    public int Lcl { get; set; }

    public int BegroupId { get; set; }

    public int CustomerId { get; set; }

    public bool PayParCont { get; set; }

    public string? Remark { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public DateTime? UpdDate { get; set; }

    public bool BDel { get; set; }

    public string AuditAction { get; set; } = null!;

    public DateTime AuditDate { get; set; }

    public string AuditUser { get; set; } = null!;

    public string? AuditApp { get; set; }
}
