using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class MigBetest
{
    public int? JobId { get; set; }

    public string? BsjobNo { get; set; }

    public string? Consignee { get; set; }

    public string? Beno { get; set; }

    public DateTime? Bedate { get; set; }

    public DateTime? BillOfEntryPassingDate { get; set; }

    public DateTime? DutyPaidDate { get; set; }

    public DateTime? OutOfChargeDate { get; set; }

    public bool? IsTrack { get; set; }
}
