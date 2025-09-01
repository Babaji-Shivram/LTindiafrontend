using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsDoProcessRemark
{
    public int Lid { get; set; }

    public int JobId { get; set; }

    public int? DoprocessRemark { get; set; }

    public int? LUser { get; set; }

    public DateTime? DtDate { get; set; }

    public DateTime? UpdDate { get; set; }

    public int? UpdUser { get; set; }

    public bool BDel { get; set; }
}
