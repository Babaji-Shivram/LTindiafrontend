using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class MigCustomerPlant
{
    public int Sl { get; set; }

    public int PlantId { get; set; }

    public int CustId { get; set; }

    public string? Customer { get; set; }

    public string? CustCode { get; set; }

    public string? Division { get; set; }

    public string? Plant { get; set; }

    public string? PlantCode { get; set; }

    public string? LiveMatch { get; set; }
}
