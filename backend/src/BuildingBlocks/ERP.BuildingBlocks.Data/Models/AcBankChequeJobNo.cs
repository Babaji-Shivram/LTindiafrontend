using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class AcBankChequeJobNo
{
    public int Lid { get; set; }

    public int JobId { get; set; }

    public int ModuleId { get; set; }

    public int ChequeId { get; set; }

    public DateTime ChequeDate { get; set; }

    public decimal? ChequeAmount { get; set; }

    public int? InvoiceId { get; set; }

    /// <summary>
    /// 1- Vendor Invoice Pending, 0 Vendor Invoice Submitted
    /// </summary>
    public bool IsActive { get; set; }

    public string? Remark { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public bool BDel { get; set; }

    public int? UpdUser { get; set; }

    public DateTime? UpdDate { get; set; }
}
