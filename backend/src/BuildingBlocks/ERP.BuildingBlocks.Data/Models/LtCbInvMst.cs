using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class LtCbInvMst
{
    public int Invmstid { get; set; }

    public int? Invid { get; set; }

    public string? TxtInvoiceNo { get; set; }

    public string? DdlConsignname { get; set; }

    public string? TxtJobno { get; set; }

    public int? Status { get; set; }

    public bool? Pssstatus { get; set; }

    public string? Pssremarks { get; set; }

    public string? Pssdrfno { get; set; }

    public DateTime? Pssdrfdate { get; set; }

    public string? DraftBookCode { get; set; }
}
