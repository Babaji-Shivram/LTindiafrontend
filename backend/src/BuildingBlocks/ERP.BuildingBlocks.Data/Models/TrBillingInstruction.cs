using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class TrBillingInstruction
{
    public int Lid { get; set; }

    public int TransReqId { get; set; }

    public int? RateId { get; set; }

    public int TransporterId { get; set; }

    public string Instruction { get; set; } = null!;

    public bool IsActive { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public bool BDel { get; set; }
}
