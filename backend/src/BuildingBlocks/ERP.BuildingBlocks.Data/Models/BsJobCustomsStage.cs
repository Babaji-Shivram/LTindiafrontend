using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsJobCustomsStage
{
    public int Lid { get; set; }

    public long JobId { get; set; }

    /// <summary>
    /// ICE_CustomsStageMS 
    /// </summary>
    public int CustomsStatgeId { get; set; }

    /// <summary>
    /// 1- Active, 0 InActive
    /// </summary>
    public bool IsActive { get; set; }

    public int? LUser { get; set; }

    public DateTime DtDate { get; set; }

    public bool BDel { get; set; }
}
