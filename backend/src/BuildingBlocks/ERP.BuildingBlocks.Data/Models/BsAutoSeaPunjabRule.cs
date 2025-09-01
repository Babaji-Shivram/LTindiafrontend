using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;
public partial class BsAutoSeaPunjabRule
{
    public int Lid { get; set; }

    public int BranchId { get; set; }

    public int PortId { get; set; }

    public int LMode { get; set; }

    public string SName { get; set; } = null!;

    public string ReportHeading { get; set; } = null!;

    public string Description { get; set; } = null!;

    public int LType { get; set; }

    public bool IsStandardApplicable { get; set; }

    public int DeliveryTypeId { get; set; }

    public bool Rms { get; set; }

    public bool NonRms { get; set; }

    public int Con20 { get; set; }

    public int Con40 { get; set; }

    public int Con45 { get; set; }

    public int Lcl { get; set; }

    public bool PayPerCont { get; set; }

    public int? FixCharges { get; set; }

    public int CustomerId { get; set; }

    public string? Remark { get; set; }

    public DateTime DtDate { get; set; }

    public DateTime? UpdDate { get; set; }

    public bool BDel { get; set; }
}
