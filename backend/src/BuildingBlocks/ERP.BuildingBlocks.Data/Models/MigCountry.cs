using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class MigCountry
{
    public string? Country { get; set; }

    public string? CountryCode { get; set; }

    public double? InternationalDialing { get; set; }
}
