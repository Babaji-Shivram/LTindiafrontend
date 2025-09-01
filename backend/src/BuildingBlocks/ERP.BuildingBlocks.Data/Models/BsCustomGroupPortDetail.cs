using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsCustomGroupPortDetail
{
    public int LId { get; set; }

    /// <summary>
    /// Destination Port Id
    /// </summary>
    public int PortId { get; set; }

    public int? GroupUserId { get; set; }

    public string GroupUserName { get; set; } = null!;

    public string? GroupUserMobile { get; set; }

    public bool IsActive { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public bool BDel { get; set; }
}
