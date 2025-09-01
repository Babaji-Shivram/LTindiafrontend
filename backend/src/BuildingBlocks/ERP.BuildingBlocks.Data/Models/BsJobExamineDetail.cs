using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsJobExamineDetail
{
    public int LId { get; set; }

    public int JobId { get; set; }

    public DateOnly? ExamineDate { get; set; }

    public DateOnly? OutOfChargeDate { get; set; }

    public DateOnly? CfsdispatchDate { get; set; }

    public decimal? FrankingAmount { get; set; }

    public DateTime? FrankingDate { get; set; }

    public decimal? Rdamount { get; set; }

    public string? Rdpercentage { get; set; }

    public int? PlanningFund { get; set; }

    public bool? IsOctroi { get; set; }

    public bool? IsSform { get; set; }

    public bool? IsNform { get; set; }

    public bool? IsRoadPermit { get; set; }

    public int? TransitType { get; set; }

    public int? WarehouseId { get; set; }

    public DateOnly? DeliveryPlanningDate { get; set; }

    public int? PlanningBy { get; set; }

    public bool? IsMobile { get; set; }

    public bool? OocfromYard { get; set; }

    public string? Remark { get; set; }

    public bool? IsContainerReExamine { get; set; }

    public bool Beprint { get; set; }

    public string? Oocremark { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public int? UpdUser { get; set; }

    public DateTime? UpdDate { get; set; }

    public bool BDel { get; set; }
}
