using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class CbEntryMode
{
    public long Lid { get; set; }

    public string EntryMode { get; set; } = null!;

    public DateTime CreatedDate { get; set; }

    public bool BDel { get; set; }
}
