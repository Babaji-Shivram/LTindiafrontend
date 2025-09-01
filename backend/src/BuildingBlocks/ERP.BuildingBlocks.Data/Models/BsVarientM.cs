using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsVarientM
{
    public int Lid { get; set; }

    public string SName { get; set; } = null!;

    public string? SCode { get; set; }

    public string? SRemarks { get; set; }

    public int LUserId { get; set; }

    public DateTime DtDate { get; set; }

    public bool BDel { get; set; }
}
