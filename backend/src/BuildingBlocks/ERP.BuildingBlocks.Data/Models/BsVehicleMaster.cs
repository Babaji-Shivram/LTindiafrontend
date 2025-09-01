using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsVehicleMaster
{
    public int Lid { get; set; }

    public string Sname { get; set; } = null!;

    public string? SRemarks { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public bool BDel { get; set; }
}
