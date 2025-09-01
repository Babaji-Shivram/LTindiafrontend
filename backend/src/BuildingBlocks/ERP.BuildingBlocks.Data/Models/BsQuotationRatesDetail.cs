using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsQuotationRatesDetail
{
    public int Lid { get; set; }

    public int QuotationId { get; set; }

    public int QuoteCategoryId { get; set; }

    public int ChargeId { get; set; }

    public decimal? Charges { get; set; }

    public string? ExtraCharges { get; set; }

    public int ApplicableFieldId { get; set; }

    public bool? IsValidAmount { get; set; }

    public bool IsLumpSumField { get; set; }

    public decimal? LumpSumCharges { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public bool BDel { get; set; }
}
