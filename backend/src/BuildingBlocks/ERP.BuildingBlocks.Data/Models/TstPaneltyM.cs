using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class TstPaneltyM
{
    public int Lid { get; set; }

    public string SName { get; set; } = null!;

    public int Days { get; set; }

    public decimal Weightage { get; set; }

    public string? Remark { get; set; }

    public bool BDel { get; set; }

    public DateTime DtDate { get; set; }
}
