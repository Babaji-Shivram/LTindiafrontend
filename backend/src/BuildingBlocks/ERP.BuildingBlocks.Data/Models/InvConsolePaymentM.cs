using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class InvConsolePaymentM
{
    public int Lid { get; set; }

    public int ConsoleId { get; set; }

    public int? LUser { get; set; }

    public DateTime DtDate { get; set; }

    public bool Bdel { get; set; }

    public int? UpdUser { get; set; }

    public DateTime? UpdDate { get; set; }
}
