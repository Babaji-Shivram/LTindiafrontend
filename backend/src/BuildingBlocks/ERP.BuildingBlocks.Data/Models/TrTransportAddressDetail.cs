using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class TrTransportAddressDetail
{
    public long LId { get; set; }

    public long? TransReqId { get; set; }

    public string? PickupAddress { get; set; }

    public int? PickupPincode { get; set; }

    public string? PickupState { get; set; }

    public string? PickupCity { get; set; }

    public string? SLatitude { get; set; }

    public string? SLongitude { get; set; }

    public string? DropAddress { get; set; }

    public int? DropPincode { get; set; }

    public string? DropState { get; set; }

    public string? DropCity { get; set; }

    public string? ELatitude { get; set; }

    public string? ELongitude { get; set; }

    public int? Bdel { get; set; }

    public int? Luser { get; set; }

    public DateTime? Dtdate { get; set; }
}
