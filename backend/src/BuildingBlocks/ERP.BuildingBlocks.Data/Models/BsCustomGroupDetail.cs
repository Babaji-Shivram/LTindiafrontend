using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsCustomGroupDetail
{
    public int LId { get; set; }

    public int DetailGroupId { get; set; }

    public int CustomGroupId { get; set; }

    public int LUser { get; set; }

    public bool BDel { get; set; }

    public DateTime DtDate { get; set; }
}
