using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class FaqFaqdetail
{
    public int Lid { get; set; }

    public int? ServiceId { get; set; }

    public string? Title { get; set; }

    public string? Subject { get; set; }

    public string? Description { get; set; }

    public string? DocPath { get; set; }

    public string? DelDocPath2 { get; set; }

    public string? DelDocPath3 { get; set; }

    public string? DocFormPath { get; set; }

    public string? DelDocFormPath2 { get; set; }

    public string? DelDocFormPath3 { get; set; }

    public DateTime? UpdDate { get; set; }

    public int? UpdlUser { get; set; }

    public bool BDel { get; set; }

    public DateTime? DtDate { get; set; }

    public int? LUser { get; set; }
}
