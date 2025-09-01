using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsBranchCf
{
    public int LId { get; set; }

    public int BranchId { get; set; }

    public int Cfsid { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public bool BDel { get; set; }

    public int? CfsuserId { get; set; }
}
