using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class FaChargesM
{
    public string Charge { get; set; } = null!;

    public string? Name { get; set; }

    public string? Shrtname1 { get; set; }

    public string? Shrtname2 { get; set; }

    public string? Group { get; set; }

    public string? Createdby { get; set; }

    public DateTime? Createdtime { get; set; }

    public string? Modifiedby { get; set; }

    public DateTime? Modifiedtime { get; set; }

    public bool Locked { get; set; }

    public string? Category { get; set; }

    public string? HsnSc { get; set; }

    public string? Chtype { get; set; }
}
