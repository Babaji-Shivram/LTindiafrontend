using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class KtUserM
{
    public int Lid { get; set; }

    public string? SName { get; set; }

    public string? SEmail { get; set; }

    public string? SCode { get; set; }

    public bool IsValid { get; set; }

    public DateTime? UpdDate { get; set; }

    public bool? BDel { get; set; }
}
