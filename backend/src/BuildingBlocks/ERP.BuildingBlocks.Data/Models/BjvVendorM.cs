using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;
public partial class BjvVendorM
{
    public int Lid { get; set; }

    public string SName { get; set; } = null!;

    public string SCode { get; set; } = null!;

    public string? Ledgcode { get; set; }

    public string? StateName { get; set; }

    public string? Gstin { get; set; }

    public string? PanNo { get; set; }

    public int? CreditDays { get; set; }

    public bool? IsCreditVendor { get; set; }

    /// <summary>
    /// 1- Registered, 2 - Un-Registered, 3 - Foreign Party
    /// </summary>
    public int VendorType { get; set; }

    /// <summary>
    /// Payment Hold on Final Invoice Pending Against Proforma
    /// </summary>
    public bool? IsPaymentHold { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public bool BDel { get; set; }

    public int? UpdUser { get; set; }

    public DateTime? UpdDate { get; set; }
}
