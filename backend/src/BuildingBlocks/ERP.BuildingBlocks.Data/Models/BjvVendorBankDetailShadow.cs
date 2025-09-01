using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;
public partial class BjvVendorBankDetailShadow
{
    public long AuditId { get; set; }

    public int Lid { get; set; }

    public int VendorId { get; set; }

    public int AccountType { get; set; }

    public string BankName { get; set; } = null!;

    public string AccountName { get; set; } = null!;

    public string AccountNo { get; set; } = null!;

    public string Ifsccode { get; set; } = null!;

    public string? Mmidcode { get; set; }

    public string? Remark { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public bool BDel { get; set; }

    public int? UpdUser { get; set; }

    public DateTime? UpdDate { get; set; }

    public string AuditAction { get; set; } = null!;

    public DateTime AuditDate { get; set; }

    public string AuditUser { get; set; } = null!;

    public string? AuditApp { get; set; }
}
