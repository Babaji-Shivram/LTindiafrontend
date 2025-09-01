using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsJobSubStatusDetail
{
    public int LId { get; set; }

    public int JobId { get; set; }

    public int StatusId { get; set; }

    public string? SRemark { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public bool BDel { get; set; }
}
