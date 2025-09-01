using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsPcdfinalDispatch
{
    public int Lid { get; set; }

    public long? JobId { get; set; }

    public DateTime? EbillDate { get; set; }

    public DateTime? FinalDispatchDate { get; set; }

    /// <summary>
    /// 0 - Pending, 1 Sent, 2 - NA
    /// </summary>
    public int? EbillStatus { get; set; }

    /// <summary>
    /// 0 - Pending, 1 Sent, 2 - NA
    /// </summary>
    public int? PhysicalBillStatus { get; set; }

    public string? Remark { get; set; }

    public int? LUser { get; set; }

    public DateTime? DtDate { get; set; }

    public int? UpdUser { get; set; }

    public DateTime? UpdDate { get; set; }

    public bool? BDel { get; set; }

    public bool? Isactive { get; set; }

    public int? ModuleId { get; set; }
}
