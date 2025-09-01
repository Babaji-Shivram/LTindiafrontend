using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class TrEwayLogin
{
    public int Lid { get; set; }

    public string SName { get; set; } = null!;

    public string Gstin { get; set; } = null!;

    public string ApiuserName { get; set; } = null!;

    public string Apipasscode { get; set; } = null!;

    public bool IsTransporter { get; set; }

    public int? ModuleId { get; set; }

    public DateTime? DtDate { get; set; }

    public bool BDel { get; set; }
}
