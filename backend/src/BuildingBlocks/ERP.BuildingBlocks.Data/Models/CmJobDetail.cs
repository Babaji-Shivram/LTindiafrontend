using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class CmJobDetail
{
    public int Lid { get; set; }

    public string? JobRefNo { get; set; }

    public int? BranchId { get; set; }

    public int? CustomerId { get; set; }

    public int? DivisionId { get; set; }

    public int? PlantId { get; set; }

    public string? Remark { get; set; }

    public bool BackOfficeStatus { get; set; }

    public int? FinYear { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public int? UpdUser { get; set; }

    public DateTime? UpdDate { get; set; }

    public bool BDel { get; set; }
}
