using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsProductInvoiceBalance
{
    public long LId { get; set; }

    public long InvoiceId { get; set; }

    public long JobId { get; set; }

    public int? ItemSrNo { get; set; }

    public int? Slno { get; set; }

    public string? Quantity { get; set; }

    public string? UnitPrice { get; set; }

    public string? UnitOfProduct { get; set; }

    public string? Description { get; set; }

    public decimal? ItemAmount { get; set; }

    public decimal? ItemAssessableValue { get; set; }

    public decimal? ItemTotalDuty { get; set; }

    public decimal? ItemAssessableValueInr { get; set; }

    public string? Cthno { get; set; }

    public string? Gstflag { get; set; }

    public decimal? GstdutyRate { get; set; }

    public decimal? GstdutyAmount { get; set; }

    public decimal? GstexemptRate { get; set; }

    public decimal? GstexemptAmount { get; set; }

    public decimal? BasicDutyRate { get; set; }

    public decimal? BasicDutyAmount { get; set; }

    public string? BasicDutyNotn { get; set; }

    public string? BasicDutyNotnSlNo { get; set; }

    public decimal? EduCessRate { get; set; }

    public decimal? EduCessAmount { get; set; }

    public decimal? HighSecEduCessAmount { get; set; }

    public decimal? SocialWelfareSurchargeRate { get; set; }

    public decimal? SocialWelfareSurchargeAmt { get; set; }

    public string? IgstLevyDutyNotifNo { get; set; }

    public string? IgstLevyDutyNotifSlNo { get; set; }

    public string? IgstExempDutyNotifNo { get; set; }

    public string? IgstExempDutyNotifSlNo { get; set; }

    public string? LicenseNo { get; set; }

    public decimal? LicenseAmount { get; set; }

    public decimal? LicenseQtyDebited { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public bool BDel { get; set; }
}
