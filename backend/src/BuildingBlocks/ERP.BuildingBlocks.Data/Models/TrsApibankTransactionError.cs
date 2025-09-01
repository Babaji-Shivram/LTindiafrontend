using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class TrsApibankTransactionError
{
    public int Lid { get; set; }

    /// <summary>
    /// Primery Key - lid - Table Name - AC_APIBankTransaction
    /// </summary>
    public int TransactionId { get; set; }

    public string? ErrorCode { get; set; }

    public string? ErrorId { get; set; }

    public string? ErrorMessage { get; set; }

    public string? ErrorActionCode { get; set; }

    public string? ErrorActionDescription { get; set; }

    public DateTime DtDate { get; set; }

    public int LUser { get; set; }
}
