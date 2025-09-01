using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class AcBankChequeM
{
    public int Lid { get; set; }

    public int BankId { get; set; }

    public int? BranchId { get; set; }

    public int AccountId { get; set; }

    public int ChequeNo { get; set; }

    public DateTime? ChequeDate { get; set; }

    public decimal? ChequeAmount { get; set; }

    /// <summary>
    /// default false- Cheque is not issued against Job
    /// </summary>
    public bool IsChequeIssued { get; set; }

    /// <summary>
    /// 1 - Cleared, 5 - Cancelled
    /// </summary>
    public int? LStatus { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public bool BDel { get; set; }

    public DateTime? UpdDate { get; set; }

    public int? UpdUser { get; set; }
}
