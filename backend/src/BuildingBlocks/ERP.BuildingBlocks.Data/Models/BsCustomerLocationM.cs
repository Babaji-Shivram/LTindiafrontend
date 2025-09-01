using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsCustomerLocationM
{
    public int Lid { get; set; }

    public int CustomerId { get; set; }

    public string SName { get; set; } = null!;

    public string? SCode { get; set; }

    public string? Gstnno { get; set; }

    /// <summary>
    /// Customer Division/Branch Or Plant
    /// </summary>
    public int LType { get; set; }

    public int LPrevId { get; set; }

    public bool ChecklistApproval { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public bool BDel { get; set; }
}
