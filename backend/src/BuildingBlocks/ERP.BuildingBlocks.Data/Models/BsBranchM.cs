using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsBranchM
{
    public int Lid { get; set; }

    public string BranchName { get; set; } = null!;

    public string? BranchCode { get; set; }

    public string? ContactNo { get; set; }

    public string? CityName { get; set; }

    public string? Address { get; set; }

    public int? CityId { get; set; }

    public string? BranchPrefix { get; set; }

    public string? BranchEmail { get; set; }

    public string? CashBookType { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public bool Bdel { get; set; }
}
