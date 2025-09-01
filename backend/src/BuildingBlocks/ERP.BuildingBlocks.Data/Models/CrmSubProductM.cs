using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class CrmSubProductM
{
    public int Lid { get; set; }

    public int? ServiceId { get; set; }

    public string? SubProductName { get; set; }

    public string? Scode { get; set; }

    public int? Luser { get; set; }

    public DateTime? DtDate { get; set; }

    public int? UpdUser { get; set; }

    public DateTime? UpdDate { get; set; }

    public int? Bdel { get; set; }
}
