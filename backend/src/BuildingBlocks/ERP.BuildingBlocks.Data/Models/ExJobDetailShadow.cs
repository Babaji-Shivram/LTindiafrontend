using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class ExJobDetailShadow
{
    public long AuditId { get; set; }

    public int Lid { get; set; }

    public int? AlertId { get; set; }

    public string? JobRefNo { get; set; }

    public string? BuyerName { get; set; }

    public string? ProductDesc { get; set; }

    public int? NoOfPackages { get; set; }

    public int? PackageType { get; set; }

    public int? ExportTypeId { get; set; }

    public int? ShippingBillType { get; set; }

    public bool? IsBabajiForwarder { get; set; }

    public string? ForwarderName { get; set; }

    public int? ContainerLoadedId { get; set; }

    public string? SealNo { get; set; }

    public decimal? GrossWt { get; set; }

    public decimal? NetWt { get; set; }

    public int? TransportBy { get; set; }

    public string? PickUpFrom { get; set; }

    public string? Destination { get; set; }

    public int? Priority { get; set; }

    public string? FileDirName { get; set; }

    public string? Fobvalue { get; set; }

    public string? Cifvalue { get; set; }

    public int? ChecklistStatus { get; set; }

    public bool? CheckListClientRequired { get; set; }

    public DateTime? ChecklistDate { get; set; }

    public string? ChecklistDocPath { get; set; }

    public bool? FilingStatus { get; set; }

    public bool? CustomCleared { get; set; }

    public bool? Form13Required { get; set; }

    public bool? Form13Cleared { get; set; }

    public bool? BackOfficeStatus { get; set; }

    public bool? DeliveryStatus { get; set; }

    public bool? ExamineStatus { get; set; }

    public int? FinYear { get; set; }

    public int? LUser { get; set; }

    public DateTime? DtDate { get; set; }

    public int? UpdUser { get; set; }

    public DateTime? UpdDate { get; set; }

    public bool? BDel { get; set; }

    public string? AuditAction { get; set; }

    public DateTime? AuditDate { get; set; }

    public string? AuditUser { get; set; }

    public string? AuditApp { get; set; }
}
