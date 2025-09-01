using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class LtTsInvDet
{
    public int Invdetid { get; set; }

    public int? Invmstid { get; set; }

    public string? TxtChargecode { get; set; }

    public string? DdlParticular { get; set; }

    public double? TxtRate { get; set; }

    public double? TxtQty { get; set; }

    public double? TxtAmt { get; set; }

    public int? LineSeq { get; set; }

    public string? VehicleNo { get; set; }

    public string? ChallanNo { get; set; }

    public DateOnly? ChallanDate { get; set; }

    public string? DestFrom { get; set; }

    public string? DestTo { get; set; }

    public string? Remark { get; set; }

    public int? LUser { get; set; }

    public DateTime DtDate { get; set; }

    public bool Bdel { get; set; }

    public DateTime? UpdDate { get; set; }

    public int? UpdUser { get; set; }
}
