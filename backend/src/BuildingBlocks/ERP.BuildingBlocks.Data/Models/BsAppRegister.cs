using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsAppRegister
{
    public int Lid { get; set; }

    public string UName { get; set; } = null!;

    public string UCompany { get; set; } = null!;

    public string UEmail { get; set; } = null!;

    public string UPhNo { get; set; } = null!;

    public string? UDesignation { get; set; }

    public int Status { get; set; }

    public DateTime? DtDate { get; set; }
}
