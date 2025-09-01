using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class CrmRoleM
{
    public int Lid { get; set; }

    public string SName { get; set; } = null!;

    public bool BDel { get; set; }
}
