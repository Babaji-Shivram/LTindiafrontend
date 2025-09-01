using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsJobLabourAmount
{
    public int Lid { get; set; }

    public int JobId { get; set; }

    public int? AlabourAmount { get; set; }

    public int? BlabourAmount { get; set; }

    public bool BDel { get; set; }
}
