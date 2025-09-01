using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class IceBestatus
{
    public long LId { get; set; }

    public string? IcejobNo { get; set; }

    public int? IcejobDate { get; set; }

    public DateTime? IcereceivedDate { get; set; }

    public DateTime? IceackReceivedDate { get; set; }

    public string? BsjobNo { get; set; }

    public long? JobId { get; set; }

    public string? IceportCode { get; set; }

    public DateTime? Iceboedate { get; set; }

    public string? Iceboeno { get; set; }

    public string? Icemessage { get; set; }

    public bool? Smssent { get; set; }

    public bool? EmailSent { get; set; }

    public string? EmailAddress { get; set; }

    public string? MobileNo { get; set; }

    /// <summary>
    /// 0- Submitted, 1- Positive Ack, 2 - Negative Ack
    /// </summary>
    public int? StatusId { get; set; }

    public int TrackCount { get; set; }

    public DateTime? DtDate { get; set; }

    public DateTime? UpdDate { get; set; }
}
