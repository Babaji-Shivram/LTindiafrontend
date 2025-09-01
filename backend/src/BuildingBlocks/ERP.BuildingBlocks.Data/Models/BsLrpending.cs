using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsLrpending
{
    /// <summary>
    /// LR Pending Details
    /// </summary>
    public int Lid { get; set; }

    public int JobId { get; set; }

    public int ModuleId { get; set; }

    public int? TransporterId { get; set; }

    public DateTime LrpendingDate { get; set; }

    public DateTime? LrreceiveDate { get; set; }

    public DateTime? PhysicalFileReceiveDate { get; set; }

    public string? Remark { get; set; }

    public string? UpdateRemark { get; set; }

    /// <summary>
    /// 0 Pending 1  LR Received
    /// </summary>
    public int? LStatus { get; set; }

    public int? LUser { get; set; }

    public DateTime DtDate { get; set; }

    public DateTime? UpdDate { get; set; }

    public int? UpdUser { get; set; }

    public bool Bdel { get; set; }
}
