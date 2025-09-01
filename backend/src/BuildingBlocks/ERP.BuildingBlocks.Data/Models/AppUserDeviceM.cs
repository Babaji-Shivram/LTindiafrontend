using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class AppUserDeviceM
{
    public int Lid { get; set; }

    public int? UserId { get; set; }

    public string? TokenId { get; set; }

    public string? ImeiNo { get; set; }

    /// <summary>
    /// 1 =&gt; Android, 2 =&gt; IOS
    /// </summary>
    public int? DeviceOsid { get; set; }

    public DateTime? DtDate { get; set; }

    public DateTime? UpdDate { get; set; }

    public bool BDel { get; set; }
}
