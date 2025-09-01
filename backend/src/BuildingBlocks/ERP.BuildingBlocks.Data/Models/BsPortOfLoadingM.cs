using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsPortOfLoadingM
{
    public int LId { get; set; }

    public string LoadingPortName { get; set; } = null!;

    public string PortCode { get; set; } = null!;

    public string? TempCode { get; set; }

    public int LMode { get; set; }

    public string? CityName { get; set; }

    public string? CountryCode { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public bool BDel { get; set; }
}
