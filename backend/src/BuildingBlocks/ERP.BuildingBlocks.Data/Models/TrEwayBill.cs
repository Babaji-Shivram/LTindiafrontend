using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class TrEwayBill
{
    public long Lid { get; set; }

    public int? TransTypeId { get; set; }

    public int? TansSubTypeId { get; set; }

    public int? JobId { get; set; }

    public string? RefNo { get; set; }

    public string? EwayBillNo { get; set; }

    public string? DocumentType { get; set; }

    public string? DocumentNo { get; set; }

    public DateTime? DocumentDate { get; set; }

    public string? FromGstin { get; set; }

    public string? ToGstin { get; set; }

    public string? TransportGstin { get; set; }

    public decimal? TotInvValue { get; set; }

    public decimal? Cgst { get; set; }

    public decimal? Sgst { get; set; }

    public decimal? Igst { get; set; }

    public decimal? Cess { get; set; }

    public string? DeliveryPlace { get; set; }

    public int? DeliveryPinCode { get; set; }

    public int? DeliveryStateCode { get; set; }

    public int? ExtendedTimes { get; set; }

    public string? StatusName { get; set; }

    public string? RejectStatus { get; set; }

    public string? VehicleNo { get; set; }

    public string? VehicleDate { get; set; }

    public string? BillGenDate { get; set; }

    public string? ValidityDate { get; set; }

    public string? UserGstin { get; set; }

    public int? EwayLoginId { get; set; }

    /// <summary>
    /// 0 - Not Valid For Movement, 1 Active, 2 Cancel, 3 Reject
    /// </summary>
    public int? LStatus { get; set; }

    public int? TransRateId { get; set; }

    public int? TrackCount { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public bool BDel { get; set; }

    public DateTime? UpdDate { get; set; }

    public int? UpdUser { get; set; }
}
