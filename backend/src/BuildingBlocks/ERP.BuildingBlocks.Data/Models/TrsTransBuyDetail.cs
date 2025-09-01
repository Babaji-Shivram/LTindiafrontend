using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class TrsTransBuyDetail
{
    public int Lid { get; set; }

    public int JobId { get; set; }

    public int ModuleId { get; set; }

    public decimal? BuyValue { get; set; }

    public decimal? SellValue { get; set; }

    public bool? IsProfit { get; set; }

    public decimal? ProfitLossPercent { get; set; }

    /// <summary>
    /// Transporter - Transport Charges
    /// </summary>
    public decimal? TransportChargesA41 { get; set; }

    /// <summary>
    ///  Transporter - Detention Charges
    /// </summary>
    public decimal? DetentionChargesT26 { get; set; }

    public DateTime DtDate { get; set; }

    public DateTime? UpdDate { get; set; }
}
