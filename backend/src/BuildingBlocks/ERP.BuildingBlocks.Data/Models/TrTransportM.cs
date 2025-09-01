using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class TrTransportM
{
    public long LId { get; set; }

    public string TrrefNo { get; set; } = null!;

    public string? OldRefNo { get; set; }

    public DateOnly? RequestDate { get; set; }

    /// <summary>
    /// Transfer Request From: New, Import, Freight, Marine
    /// </summary>
    public int LType { get; set; }

    public int? JobId { get; set; }

    public string? JobRefNo { get; set; }

    public int? BranchId { get; set; }

    public int CustomerId { get; set; }

    public int? DivisionId { get; set; }

    public int? PlantId { get; set; }

    public int? TransMode { get; set; }

    public string? LocationFrom { get; set; }

    public string? Destination { get; set; }

    public int? NoOfPkgs { get; set; }

    public decimal? GrossWeight { get; set; }

    public int? Count20 { get; set; }

    public int? Count40 { get; set; }

    public bool? IsVehiclePlaced { get; set; }

    public int? DeliveryType { get; set; }

    public bool? BillStatus { get; set; }

    public int? VehicleCount { get; set; }

    /// <summary>
    /// 1=import, 2=&gt;export, 3 =&gt;New Transport
    /// </summary>
    public int? JobType { get; set; }

    public int? ExportType { get; set; }

    public string? Dimension { get; set; }

    public DateOnly? VehiclePlaceRequireDate { get; set; }

    public int? VehicleRequired { get; set; }

    public bool IsConsolidated { get; set; }

    public int? ConsolidateId { get; set; }

    public bool? MovementCompleted { get; set; }

    public int? DeliveryStatus { get; set; }

    public bool? BackOfficeStatus { get; set; }

    public bool? IsNew { get; set; }

    public bool? IsTransportBilled { get; set; }

    public bool? IsFapost { get; set; }

    public int? TempConsolidatedId { get; set; }

    /// <summary>
    /// 12 - Babaji Tansport / 3 - Navbharat
    /// </summary>
    public int? CompanyId { get; set; }

    public string? CompanyName { get; set; }

    public string? CompanyGstin { get; set; }

    public string? Remark { get; set; }

    public int FinYear { get; set; }

    public int LStatus { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public int? UpdUser { get; set; }

    public DateTime? UpdDate { get; set; }

    public bool BDel { get; set; }
}
