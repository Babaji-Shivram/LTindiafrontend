using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsRoleM
{
    public int LRoleId { get; set; }

    public string? SName { get; set; }

    public string? SRemarks { get; set; }

    public int LUserId { get; set; }

    public DateTime? DtDate { get; set; }

    public int? BDel { get; set; }
}
