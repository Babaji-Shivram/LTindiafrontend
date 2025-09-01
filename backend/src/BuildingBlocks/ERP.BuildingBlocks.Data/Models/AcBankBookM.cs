using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class AcBankBookM
{
    public int Lid { get; set; }

    /// <summary>
    /// BankID - PK - BJV_BankMS
    /// </summary>
    public int? BankId { get; set; }

    public string SName { get; set; } = null!;

    public string SCode { get; set; } = null!;

    public string? Gstin { get; set; }

    public string? AccountNo { get; set; }

    public string? Ifsccode { get; set; }

    public int? CustomerId { get; set; }

    public int? BankApiid { get; set; }

    /// <summary>
    /// 1 - Bank Book, 2- Cash Book
    /// </summary>
    public int? LType { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public bool BDel { get; set; }
}
