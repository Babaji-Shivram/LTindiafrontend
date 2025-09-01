using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class MigContainerMove
{
    public double? SrNo { get; set; }

    public string? IgmNo { get; set; }

    public string? ItemNo { get; set; }

    public string? BlNo { get; set; }

    public string? ContNo { get; set; }

    public string? ContSize { get; set; }

    public string? LineName { get; set; }

    public string? ChaName { get; set; }

    public string? ImporterName { get; set; }

    public string? BillItemDescription { get; set; }

    public double? Payable { get; set; }
}
