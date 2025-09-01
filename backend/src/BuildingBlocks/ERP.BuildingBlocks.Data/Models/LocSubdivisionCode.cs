using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class LocSubdivisionCode
{
    public int Lid { get; set; }

    public string CountryCode { get; set; } = null!;

    public string? SCode { get; set; }

    public string? SName { get; set; }

    public string? SType { get; set; }

    public bool Bdel { get; set; }

    public DateTime DtDate { get; set; }
}
