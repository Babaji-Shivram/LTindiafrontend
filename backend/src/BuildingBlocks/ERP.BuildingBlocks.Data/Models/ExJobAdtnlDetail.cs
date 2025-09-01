using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class ExJobAdtnlDetail
{
    public int Lid { get; set; }

    public int JobId { get; set; }

    public DateTime? SbfiledDate { get; set; }

    public int? SbfiledBy { get; set; }

    public DateTime? CustomClearedOn { get; set; }

    public int? CustomClearedBy { get; set; }

    public DateTime? Form13ClearedOn { get; set; }

    public int? Form13ClearedBy { get; set; }

    public DateTime? ShipmentClearedOn { get; set; }

    public int? ShipmentClearedBy { get; set; }

    public string? Mawbno { get; set; }

    public DateOnly? Mawbdate { get; set; }

    public string? Hawbno { get; set; }

    public DateOnly? Hawbdate { get; set; }

    public string? Dimension { get; set; }

    public string? PickupPersonName { get; set; }

    public DateOnly? PickupDate { get; set; }

    public string? PickupPhoneNo { get; set; }

    public bool? IsAdc { get; set; }

    public bool? IsHaze { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public bool BDel { get; set; }
}
