using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class CrmMomAgendum
{
    public int Lid { get; set; }

    public int MomId { get; set; }

    public string? Topic { get; set; }

    public string? Description { get; set; }

    public string? PersonName { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public bool BDel { get; set; }
}
