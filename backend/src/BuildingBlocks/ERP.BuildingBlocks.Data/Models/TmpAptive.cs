using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class TmpAptive
{
    public DateTime JobCreationDate { get; set; }

    public double? SrNo { get; set; }

    public string? BsJobNo { get; set; }

    public double BeNo { get; set; }

    public DateTime BeDt { get; set; }

    public DateTime FlightInwardDt { get; set; }

    public double MblMawblNo { get; set; }

    public double HblHawblNo { get; set; }

    public string Importer { get; set; } = null!;

    public double Weight { get; set; }

    public DateTime ShipmentClearedOn { get; set; }

    public string Location { get; set; } = null!;
}
