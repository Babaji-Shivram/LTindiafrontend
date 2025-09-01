using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class CrmFreightPortRequirement
{
    public int Lid { get; set; }

    public int? FreightReqId { get; set; }

    /// <summary>
    /// 0 - POL, 1 - POD
    /// </summary>
    public bool? TypeId { get; set; }

    public string? PortName { get; set; }

    public int? LUser { get; set; }

    public DateTime? DtDate { get; set; }

    public bool? BDel { get; set; }
}
