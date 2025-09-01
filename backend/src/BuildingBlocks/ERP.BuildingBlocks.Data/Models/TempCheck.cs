using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class TempCheck
{
    public int Lid { get; set; }

    public int? JobId { get; set; }

    public string? RefNo { get; set; }

    public string? ParName { get; set; }

    public DateTime? JobDate { get; set; }

    public DateTime? DeliveryDate { get; set; }

    public DateTime? BillAdviceDate { get; set; }

    public bool? Cleared { get; set; }
}
