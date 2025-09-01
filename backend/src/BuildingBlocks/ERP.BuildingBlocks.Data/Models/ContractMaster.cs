using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class ContractMaster
{
    public long Lid { get; set; }

    public long CustomerId { get; set; }

    public string ContractName { get; set; } = null!;

    public string? DivisionId { get; set; }

    public DateTime ContractStartDate { get; set; }

    public DateTime ContractEndDate { get; set; }

    public int LUser { get; set; }

    public DateTime CreatedDate { get; set; }

    public bool BDel { get; set; }

    public string? ContractUid { get; set; }
}
