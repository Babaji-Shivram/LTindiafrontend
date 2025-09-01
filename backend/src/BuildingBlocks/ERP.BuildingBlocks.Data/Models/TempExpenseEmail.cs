using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class TempExpenseEmail
{
    public string? JobRefNo { get; set; }

    public decimal? Rms { get; set; }

    public decimal? NonRms { get; set; }

    public decimal? PkgHandling { get; set; }

    public decimal? BondShipment { get; set; }

    public decimal? CourierShipment { get; set; }

    public decimal? RunwayDelivery { get; set; }

    public decimal? NonRmsAddtional { get; set; }

    public decimal? RmsAdditional { get; set; }

    public decimal? ReImport { get; set; }

    public decimal? Adc { get; set; }

    public decimal? OldUsed { get; set; }
}
