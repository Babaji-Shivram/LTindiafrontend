using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class AcApibankAccount
{
    public int Lid { get; set; }

    public int Apiid { get; set; }

    public int? BankId { get; set; }

    public string CustomerId { get; set; } = null!;

    public int? AccountId { get; set; }

    public string AccountNo { get; set; } = null!;

    public string AccountType { get; set; } = null!;

    public bool IsActive { get; set; }

    public string? Remark { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public int? UpdUser { get; set; }

    public DateTime? UpdDate { get; set; }

    /// <summary>
    /// Bank Statment sync date for Blank Cheque Details
    /// </summary>
    public DateTime? SyncDate { get; set; }

    public bool BDel { get; set; }
}
