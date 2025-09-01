using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class AcFachequeDetail
{
    public int Lid { get; set; }

    public string ChequeNo { get; set; } = null!;

    public DateTime ChequeDate { get; set; }

    public string? BankName { get; set; }

    public decimal? ChequeAmount { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public bool BDel { get; set; }
}
