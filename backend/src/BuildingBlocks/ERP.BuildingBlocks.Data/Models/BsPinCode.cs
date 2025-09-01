using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsPinCode
{
    public int Lid { get; set; }

    public string? PostOfficeName { get; set; }

    public int? Pincode { get; set; }

    public string? City { get; set; }

    public string? District { get; set; }

    public string? State { get; set; }
}
