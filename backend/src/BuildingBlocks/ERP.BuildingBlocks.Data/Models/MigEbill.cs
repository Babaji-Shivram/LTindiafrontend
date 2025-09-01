using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class MigEbill
{
    public int? Lid { get; set; }

    public DateTime? BillDate { get; set; }

    public string? BillNo { get; set; }

    public string? PartyName { get; set; }

    public string? JobNo { get; set; }

    public double? Amount { get; set; }

    public DateTime? MailToClient { get; set; }

    public bool? IsUpdate { get; set; }

    public string? F8 { get; set; }

    public string? F9 { get; set; }

    public string? F10 { get; set; }

    public string? F11 { get; set; }
}
