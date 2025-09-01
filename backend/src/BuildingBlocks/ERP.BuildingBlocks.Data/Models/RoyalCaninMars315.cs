using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class RoyalCaninMars315
{
    public int Lid { get; set; }

    public int JobId { get; set; }

    public int ContainerId { get; set; }

    public int? CustomClearedStatus { get; set; }

    /// <summary>
    /// Date on which Container OCC Detail send to Royal Canin FTP Site
    /// </summary>
    public DateTime? CustomerClearedDate { get; set; }

    public string? CustomerClearedFilePath { get; set; }

    public int? ContainerDispatchStatus { get; set; }

    /// <summary>
    /// Date on which Container Dispatch Detail send to Royal Canin FTP Site
    /// </summary>
    public DateTime? ContainerDispatchDate { get; set; }

    public string? ContainerDispatchFilePath { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public DateTime? UpdDate { get; set; }
}
