using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsLrpackageDetail
{
    public int Lid { get; set; }

    public int Lrid { get; set; }

    public string? Packages { get; set; }

    public string? Description { get; set; }

    public string? ActualWt { get; set; }

    public string? Charged { get; set; }

    public int? LUser { get; set; }

    public DateOnly? DtDate { get; set; }

    public int? UpdUser { get; set; }

    public DateOnly? UpdDate { get; set; }

    public string? BDel { get; set; }
}
