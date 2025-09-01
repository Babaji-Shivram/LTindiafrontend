using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class MigLgdispatch1
{
    public int? Lid { get; set; }

    public int? JobId { get; set; }

    public string? JobRefNo { get; set; }

    public string? Mbl { get; set; }

    public DateTime? Igmdate { get; set; }

    public DateTime? Oocdate { get; set; }

    public DateTime? IceIgm { get; set; }

    public string? HblHawbNo { get; set; }

    public string? Customer { get; set; }

    public string? ShippingAirline { get; set; }

    public string? ContainerType { get; set; }

    public string? Port { get; set; }

    public DateTime? Eta { get; set; }

    public double? Aging { get; set; }

    public string? Container { get; set; }

    public string? FollowUpDate { get; set; }

    public DateTime? JobCreatedDate { get; set; }
}
