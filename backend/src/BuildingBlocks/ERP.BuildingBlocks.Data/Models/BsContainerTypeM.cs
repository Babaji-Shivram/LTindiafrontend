using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsContainerTypeM
{
    public int LId { get; set; }

    public string SName { get; set; } = null!;

    public string SCode { get; set; } = null!;

    public bool BDel { get; set; }
}
