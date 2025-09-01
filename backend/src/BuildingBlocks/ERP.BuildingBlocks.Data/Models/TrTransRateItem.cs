using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class TrTransRateItem
{
    public int Lid { get; set; }

    public int TransReqId { get; set; }

    public int TransRateId { get; set; }

    public int ChargeTypeId { get; set; }

    public decimal Charges { get; set; }

    /// <summary>
    /// 0 - no Tax 1 - IGST 2 -CGST / IGST
    /// </summary>
    public int TaxType { get; set; }

    public decimal TaxPercent { get; set; }

    public decimal TaxAmount { get; set; }

    public decimal TotalCharges { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public bool Bdel { get; set; }

    public int? UpdUser { get; set; }

    public DateTime? UpdDate { get; set; }
}
