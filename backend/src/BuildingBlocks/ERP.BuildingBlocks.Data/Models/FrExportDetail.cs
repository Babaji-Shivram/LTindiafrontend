using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class FrExportDetail
{
    public int Lid { get; set; }

    public int EnqId { get; set; }

    public string? Sbno { get; set; }

    public DateTime? Sbdate { get; set; }

    public DateTime? ContainerPickDate { get; set; }

    public DateTime? CustomDate { get; set; }

    public DateTime? StuffingDate { get; set; }

    public DateTime? Clpdate { get; set; }

    public string? Vgmno { get; set; }

    public DateTime? Vgmdate { get; set; }

    public DateTime? Form13Date { get; set; }

    public string? Mblno { get; set; }

    public string? Hblno { get; set; }

    public string? Blno { get; set; }

    public DateTime? Mbldate { get; set; }

    public DateTime? Hbldate { get; set; }

    public DateTime? Bldate { get; set; }

    public string? Blremarks { get; set; }

    public string? ContainerNo { get; set; }

    public string? PreAlertEmail { get; set; }

    public DateTime? ShipOnboardDate { get; set; }

    public string? OnboardRemark { get; set; }

    /// <summary>
    /// ASIBy Add For The Mode Air
    /// </summary>
    public string? Asiby { get; set; }

    public DateTime? Asidate { get; set; }

    public DateTime? CartingDate { get; set; }

    public string? FlightScheduleDetail { get; set; }

    public DateTime? Leodate { get; set; }

    public string? ShipLineBookingNo { get; set; }

    public string? VesselName { get; set; }

    public string? BookingSpace { get; set; }

    public string? ShippingOrderRemark { get; set; }

    public string? PlaceOfDelivery { get; set; }

    public DateTime? Etatranshipment { get; set; }

    public DateTime? Etdtranshipment { get; set; }

    public DateTime? Atadestination { get; set; }

    public DateTime? Etadestination { get; set; }

    public DateTime? SicutoffDate { get; set; }

    public DateTime? VgmcutoffDate { get; set; }

    public DateTime? HazcutoffDate { get; set; }

    public DateTime? Form13CutoffDate { get; set; }

    public DateTime? SurveyCutoffDate { get; set; }

    public DateTime? DockCutoffDate { get; set; }

    public string? ShippingNo { get; set; }

    public DateTime? ShippingDate { get; set; }

    public string? UnderPortRemark { get; set; }

    public string? PreAlertRemarks { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public int? UpdUser { get; set; }

    public DateTime? UpdDate { get; set; }

    public bool BDel { get; set; }
}
