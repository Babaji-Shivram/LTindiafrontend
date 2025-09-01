using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class TempUsercount
{
    public bool? Selection { get; set; }

    public string? ChargeCode { get; set; }

    public string? ChargeName { get; set; }

    public double? Rate { get; set; }

    public string? Uom { get; set; }

    public int? Quantity { get; set; }

    public string? Mode { get; set; }

    public string? ContainerSize { get; set; }

    public string? ContainerType { get; set; }

    public string? RmsnonRms { get; set; }

    public string? PortName { get; set; }

    public string? JobType { get; set; }

    public int? Lid { get; set; }

    public int? TypeOfBeid { get; set; }

    public int? ContainerTypeId { get; set; }

    public int? DivisionId { get; set; }

    public int? JobTypeId { get; set; }

    public int? ModeId { get; set; }

    public double? RangeFrom { get; set; }

    public double? RangeTo { get; set; }

    public double? CapMin { get; set; }

    public double? CapMax { get; set; }

    public int? Jobid { get; set; }

    public string? Condition { get; set; }
}
