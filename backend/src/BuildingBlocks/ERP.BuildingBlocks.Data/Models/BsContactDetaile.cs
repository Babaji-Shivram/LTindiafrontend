using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsContactDetaile
{
    public int Lid { get; set; }

    public int? CustomerId { get; set; }

    public string? TypeOfContact { get; set; }

    public string? ContactName { get; set; }

    public string? ContactEmail { get; set; }

    public string? PhonNo { get; set; }

    public string? LandLine { get; set; }

    public DateTime? DtDate { get; set; }

    public bool? BDel { get; set; }

    public int? LUser { get; set; }
}
