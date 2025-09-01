using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsWarehouseTypeM
{
    public int LId { get; set; }

    public string TypeName { get; set; } = null!;

    public DateTime DtDate { get; set; }

    public bool BDel { get; set; }
}
