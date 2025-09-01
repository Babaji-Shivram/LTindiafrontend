using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class InvConsolePaymentDetail
{
    public int Lid { get; set; }

    public int ConsolePaymentId { get; set; }

    public int InvoiceId { get; set; }

    public int LUser { get; set; }

    public bool BDel { get; set; }

    public DateTime Dtdate { get; set; }
}
