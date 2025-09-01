using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsContainerTrackEventHistory
{
    public int LId { get; set; }

    public int? JobId { get; set; }

    public DateTime? EventDate { get; set; }

    public string? EventLocation { get; set; }

    public string? EventDescription { get; set; }

    public string? VesselVoyage { get; set; }

    public string? VesselName { get; set; }

    public string? Voyage { get; set; }

    public int? LUser { get; set; }

    public DateTime DtDate { get; set; }

    public DateTime? UpdDate { get; set; }

    public int? UpdUser { get; set; }

    public bool BDel { get; set; }
}
