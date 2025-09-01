using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class MpMyPaccoJobAwb
{
    public int Lid { get; set; }

    public int Awbid { get; set; }

    public int JobId { get; set; }

    public string? JobRefNo { get; set; }

    public int? ModuleId { get; set; }

    /// <summary>
    /// Flag for Billing Dispatch Status Update 
    /// </summary>
    public bool IsDispatchUpdate { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public bool BDel { get; set; }

    public DateTime? UpdDate { get; set; }
}
