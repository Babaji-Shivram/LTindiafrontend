using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsTrackContainerDetail
{
    public int LId { get; set; }

    public int JobId { get; set; }

    public string? JobRefNo { get; set; }

    public string? Type { get; set; }

    public string? ContainerNumber { get; set; }

    public string? ContainerType { get; set; }

    public string? ShippingLine { get; set; }

    public string? Status { get; set; }

    public string? ArrivalStatus { get; set; }

    public string? Pod { get; set; }

    public DateTime? Eta { get; set; }

    public DateTime? PodarrivalDate { get; set; }

    public string? Pol { get; set; }

    public string? Poo { get; set; }

    public string? VesselName { get; set; }

    public string? Voyage { get; set; }

    public string? NormalizedShippingLine { get; set; }

    public int? ModuleId { get; set; }

    public int? LUser { get; set; }

    public DateTime DtDate { get; set; }

    public DateTime? UpdDate { get; set; }

    public int? UpdUser { get; set; }

    public bool BDel { get; set; }
}
