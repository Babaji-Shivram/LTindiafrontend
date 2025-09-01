using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsLrdetail
{
    public int Lid { get; set; }

    public int? CompId { get; set; }

    public int? LiablePayTo { get; set; }

    public string? Cnno { get; set; }

    public DateOnly? Cndate { get; set; }

    public string? InvoiceNo { get; set; }

    public DateOnly? InvoiceDate { get; set; }

    public string? Lrfrom { get; set; }

    public string? Lrto { get; set; }

    public string? ConsignorNm { get; set; }

    public string? DeliveryAddr { get; set; }

    public string? State { get; set; }

    public string? TelNo { get; set; }

    public string? VehicleNo { get; set; }

    public string? OurJobNo { get; set; }

    public string? WayBillNo { get; set; }

    public string? VehicleType { get; set; }

    public string? Beno { get; set; }

    public string? Blno { get; set; }

    public string? ConsigneeNm { get; set; }

    public int? FinYearId { get; set; }

    public int? LUser { get; set; }

    public DateOnly? DtDate { get; set; }

    public int? UpdUser { get; set; }

    public DateOnly? UpdDate { get; set; }

    public string? BDel { get; set; }
}
