using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class MigCustomerSector
{
    public int Sl { get; set; }

    public string? Customer { get; set; }

    public int? CustomerId { get; set; }

    public string? Sector { get; set; }

    public int? SectId { get; set; }

    public string? Code { get; set; }
}
