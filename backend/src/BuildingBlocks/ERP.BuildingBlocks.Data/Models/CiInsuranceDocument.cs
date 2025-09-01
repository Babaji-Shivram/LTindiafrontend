using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class CiInsuranceDocument
{
    public int LId { get; set; }

    public int InsuranceReqId { get; set; }

    public string? FileName { get; set; }

    public string? FilePath { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public bool BDel { get; set; }

    public DateTime? UpdDate { get; set; }

    public int? UpdUser { get; set; }
}
