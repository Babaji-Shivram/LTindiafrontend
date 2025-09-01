using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsStampDutyDetail
{
    public long Lid { get; set; }

    public int Jobid { get; set; }

    public bool Dutyrequired { get; set; }

    public decimal? Amount { get; set; }

    public decimal? AdministrationCharges { get; set; }

    public decimal? Servicetaxamt { get; set; }

    public string? ServiceTaxRate { get; set; }

    public string? SwachhBharatRate { get; set; }

    public decimal? SwachhBharatamt { get; set; }

    public string? KrishiKalaynRate { get; set; }

    public decimal? KrishiKalaynamt { get; set; }

    public string? ChallanNo { get; set; }

    public DateTime? ChallanDate { get; set; }

    public string? ChallanCopy { get; set; }

    public string? BillNo { get; set; }

    public DateTime? BillDate { get; set; }

    public int? Requestedby { get; set; }

    public DateTime? RequestedDate { get; set; }

    public int? Completedby { get; set; }

    public DateTime? CompletedDate { get; set; }

    public int? Luser { get; set; }

    public DateTime? Dtdate { get; set; }

    public int? Bdel { get; set; }
}
