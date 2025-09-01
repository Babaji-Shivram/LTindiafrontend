using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class AcApibankStatementLog
{
    public long Lid { get; set; }

    public int BankAccountId { get; set; }

    public DateTime TxnDate { get; set; }

    public string TxnDesc { get; set; } = null!;

    public decimal? AmtWithdrawal { get; set; }

    public decimal? AmtDeposit { get; set; }

    public int? RefChqNum { get; set; }

    public string? CodTxnLiteral { get; set; }

    public string? RefUsrNo { get; set; }

    public DateTime DtDate { get; set; }

    /// <summary>
    ///  0 - Not Validated, 1 - Valid, 2 Invalid Amount
    /// </summary>
    public int ValidationFlag { get; set; }

    public int LUser { get; set; }

    public bool BDel { get; set; }
}
