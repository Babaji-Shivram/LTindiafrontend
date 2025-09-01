using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsMissingJob
{
    public int Lid { get; set; }

    public string JobRefNo { get; set; } = null!;

    public string? InbondJobNumber { get; set; }

    public string? ConsigneeCode { get; set; }

    public int? ConsigneeId { get; set; }

    public DateTime? Eta { get; set; }

    public int? BoeType { get; set; }

    public int? Mode { get; set; }

    public string? CustomerRefNo { get; set; }

    public DateTime DtDate { get; set; }
}
