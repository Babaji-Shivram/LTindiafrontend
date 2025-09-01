using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class AcFachequeIssue
{
    public int Lid { get; set; }

    public int ChequeId { get; set; }

    public int? JobId { get; set; }

    public string? JobRefNo { get; set; }

    public int CustomerId { get; set; }

    public decimal JobAmount { get; set; }

    public string PayTo { get; set; } = null!;

    public string? PayToCode { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public bool BDel { get; set; }
}
