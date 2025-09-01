using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class OdInvoiceRequestShadow
{
    public long AuditId { get; set; }

    public int Lid { get; set; }

    public string? OdexRefNo { get; set; }

    public int JobId { get; set; }

    public int? ShippingId { get; set; }

    public string? ShippingName { get; set; }

    public string? ShippingCode { get; set; }

    public string? ConsigneeName { get; set; }

    public string? ConsigneeGst { get; set; }

    public string? ConsigneeContactNo { get; set; }

    public string? ConsigneeEmail { get; set; }

    public string? ConsigneeAddress { get; set; }

    public string? ConsigneesState { get; set; }

    public string Blno { get; set; } = null!;

    public string? InvCategory { get; set; }

    public string LocationCode { get; set; } = null!;

    public bool IsFreeDays { get; set; }

    public DateTime? FreeDaysValidity { get; set; }

    public int? NoOfFreeDays { get; set; }

    public bool? IsDoext { get; set; }

    public bool? IsHighSeaSales { get; set; }

    public bool? IsSeawayBl { get; set; }

    public bool? IsMblHbl { get; set; }

    public bool? IsAddChrgReq { get; set; }

    public int? HblCount { get; set; }

    public DateTime? StorageChargeDays { get; set; }

    public bool? IsLatePymtChrg { get; set; }

    public bool? IsHaz { get; set; }

    public bool? IsOdc { get; set; }

    public DateTime? DischargeDate { get; set; }

    public string? Remark { get; set; }

    public int LStatus { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public bool BDel { get; set; }

    public int? UpdUser { get; set; }

    public DateTime? UpdDate { get; set; }

    public string AuditAction { get; set; } = null!;

    public DateTime AuditDate { get; set; }

    public string AuditUser { get; set; } = null!;

    public string? AuditApp { get; set; }
}
