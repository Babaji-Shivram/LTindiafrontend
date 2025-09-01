using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsPendingDocRequestDetail
{
    public int LId { get; set; }

    public int JobId { get; set; }

    public DateTime LastRequestDate { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public bool BDel { get; set; }
}
