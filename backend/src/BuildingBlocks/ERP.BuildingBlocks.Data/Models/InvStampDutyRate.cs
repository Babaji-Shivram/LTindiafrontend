using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class InvStampDutyRate
{
    public int Lid { get; set; }

    public string? CustomerName { get; set; }

    public string? CustCode { get; set; }

    public int? CustomerId { get; set; }

    public int? TransModeId { get; set; }

    public bool? IsAdminFeesApplicable { get; set; }

    public string? AdminFeesApplicable { get; set; }

    public decimal? AdminCharges { get; set; }

    public string? FixRate { get; set; }

    public string? Remark { get; set; }

    public int? LUser { get; set; }

    public DateTime? DtDate { get; set; }

    public bool? Bdel { get; set; }

    public int? UpdUser { get; set; }

    public DateTime? UpdDate { get; set; }
}
