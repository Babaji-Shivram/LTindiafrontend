using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class InvInvoiceHoldHistory
{
    public long Lid { get; set; }

    public int? Invoiceid { get; set; }

    public bool? IsActive { get; set; }

    public bool? IsFinal { get; set; }

    public string? Remark { get; set; }

    public int UpdlUser { get; set; }

    public DateTime? UpdDate { get; set; }

    public bool BDel { get; set; }
}
