using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class IceContainerDetail
{
    public int LId { get; set; }

    public int? JobId { get; set; }

    public int LType { get; set; }

    public string? IgmNo { get; set; }

    public string? LineNo { get; set; }

    public string? SublineNo { get; set; }

    public string? ContainerDetails { get; set; }

    public string? ContainerStatus { get; set; }

    public bool IsActive { get; set; }

    public int? LUser { get; set; }

    public DateTime DtDate { get; set; }

    public DateTime? UpdDate { get; set; }

    public int? UpdUser { get; set; }

    public bool BDel { get; set; }
}
