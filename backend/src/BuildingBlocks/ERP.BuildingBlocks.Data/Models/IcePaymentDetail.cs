using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class IcePaymentDetail
{
    public int Lid { get; set; }

    public int JobId { get; set; }

    public int SbId { get; set; }

    public string ChallanNo { get; set; } = null!;

    public decimal? DutyAmount { get; set; }

    public decimal? CessAmount { get; set; }

    public decimal? TotalDuty { get; set; }

    public decimal? DutyPaid { get; set; }

    public string ModeOfPayment { get; set; } = null!;

    public bool BDel { get; set; }

    public DateTime DtDate { get; set; }

    public DateTime? UpdDate { get; set; }
}
