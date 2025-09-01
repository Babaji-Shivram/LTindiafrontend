using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class CiContainerDetail
{
    public int LId { get; set; }

    public int InsuranceReqId { get; set; }

    public string? ContainerNo { get; set; }

    public string? ContainerSize { get; set; }

    public decimal? ContainerValue { get; set; }

    public string? ContainerType { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public int? UpdUser { get; set; }

    public DateTime? UpdDate { get; set; }

    public bool BDel { get; set; }
}
