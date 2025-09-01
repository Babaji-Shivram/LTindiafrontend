using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsCustCreditInput
{
    public int Lid { get; set; }

    public string? CustomerName { get; set; }

    public DateTime? OssentDate { get; set; }

    public decimal? TotalDue { get; set; }

    public decimal? OverDue { get; set; }

    public decimal? DisputedAmount { get; set; }

    public string? Bsccplremark { get; set; }

    public string? ClientRemark { get; set; }

    public string? Ccm { get; set; }

    public string? Kam { get; set; }

    public bool BDel { get; set; }

    public DateTime DtDate { get; set; }

    public DateTime? UpdDate { get; set; }
}
