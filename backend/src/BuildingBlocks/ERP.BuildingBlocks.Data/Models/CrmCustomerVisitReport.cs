using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class CrmCustomerVisitReport
{
    public int Lid { get; set; }

    public int CustomerId { get; set; }

    public DateTime VisitDate { get; set; }

    public string Remark { get; set; } = null!;

    public string? Latitude { get; set; }

    public string? Longitude { get; set; }

    public string? Address { get; set; }

    public bool IsMobile { get; set; }

    public int? FinYear { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public bool BDel { get; set; }

    public int? VisitCategory { get; set; }
}
