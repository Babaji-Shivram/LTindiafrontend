using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsIgmDetailShadow
{
    public long AuditId { get; set; }

    public int LId { get; set; }

    public int JobId { get; set; }

    public int AlertId { get; set; }

    public string? Ffname { get; set; }

    public string? Mawbno { get; set; }

    public string? Hawbno { get; set; }

    public DateOnly? Mawbdate { get; set; }

    public DateOnly? Hawbdate { get; set; }

    public string? Igmno { get; set; }

    public string? Igmno2 { get; set; }

    public string? Igmno3 { get; set; }

    public DateOnly? Igmdate { get; set; }

    public DateOnly? Igmdate2 { get; set; }

    public DateOnly? Igmdate3 { get; set; }

    public string? Igmitem { get; set; }

    public string? IgmsubItem { get; set; }

    public string? IgmsubItem2 { get; set; }

    public string? IgmsubItem3 { get; set; }

    public string? LandIgmno { get; set; }

    public DateOnly? LandIgmdate { get; set; }

    public DateOnly? InwardDate { get; set; }

    public int? Cfsid { get; set; }

    public DateOnly? Cfsdate { get; set; }

    public string? Supplier { get; set; }

    public string? ShortDescription { get; set; }

    public string? ShippingName { get; set; }

    public string? VesselName { get; set; }

    public string? HsssellerName { get; set; }

    public decimal? AssessableValueDeleted { get; set; }

    public DateOnly? FollowUpDate { get; set; }

    public string? Igmremark { get; set; }

    public int? ShippingId { get; set; }

    public int? Igmuser { get; set; }

    public int UserId { get; set; }

    public DateTime DtDate { get; set; }

    public DateTime? UpdDate { get; set; }

    public bool BDel { get; set; }

    public DateTime? IgmsyncDate { get; set; }

    public string AuditAction { get; set; } = null!;

    public DateTime AuditDate { get; set; }

    public string AuditUser { get; set; } = null!;

    public string? AuditApp { get; set; }
}
