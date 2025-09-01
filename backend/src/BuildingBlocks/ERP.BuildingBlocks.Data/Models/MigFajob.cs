using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class MigFajob
{
    public int Lid { get; set; }

    public int? JobId { get; set; }

    public string? Bjvno { get; set; }

    public string? Draftby { get; set; }

    public DateTime? Draftdate { get; set; }

    public string? Drfcompby { get; set; }

    public DateTime? Drfcompdate { get; set; }

    public string? Flby { get; set; }

    public DateTime? Fldate { get; set; }

    public DateTime? Invdate { get; set; }

    public string? Invno { get; set; }

    public double? Invamount { get; set; }

    public string? Fsb { get; set; }

    public string? DispatchDate { get; set; }
}
