using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class CbBillingDetailUserDetail
{
    public int Lid { get; set; }

    public int? CbLid { get; set; }

    public int? Jobid { get; set; }

    public string? Jobno { get; set; }

    public string? ChargeCode { get; set; }

    public string? ChargeName { get; set; }

    public int? Qty { get; set; }

    public int? Createdby { get; set; }

    public DateTime? Createddate { get; set; }

    public int? Status { get; set; }
}
