using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsUserLoginHistory
{
    public long LId { get; set; }

    public int UserId { get; set; }

    public DateTime LoginDate { get; set; }

    public int? ModuleId { get; set; }

    public string? Ipaddress { get; set; }

    /// <summary>
    /// 1- Login From Mobile, 0 - Login From Web
    /// </summary>
    public bool? IsMobile { get; set; }

    public bool BDel { get; set; }
}
