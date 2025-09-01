using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;
public partial class BsBillingInstructionRef
{
    public int LId { get; set; }

    public int JobId { get; set; }

    public int? InstrctionId { get; set; }

    public int? ReadBy { get; set; }

    public DateTime? ReadDate { get; set; }

    public int? ChargeBy { get; set; }

    public DateTime? ChargeDate { get; set; }

    public int? ModelId { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public int? UpdBy { get; set; }

    public DateTime? Upddate { get; set; }

    public bool BDel { get; set; }
}
