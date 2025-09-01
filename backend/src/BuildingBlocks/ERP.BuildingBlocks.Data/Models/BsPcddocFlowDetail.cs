using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsPcddocFlowDetail
{
    public long LId { get; set; }

    public int JobId { get; set; }

    public int PcddocId { get; set; }

    /// <summary>
    /// PCD Dcoument Type- BackOffice = 1, PCACustomer = 2, BillingAdvice = 3, BillingDispatch = 4
    /// </summary>
    public int LTypeId { get; set; }

    public bool? IsCopy { get; set; }

    public bool? IsOriginal { get; set; }

    public int LUser { get; set; }

    public bool BDel { get; set; }

    public DateTime DtDate { get; set; }
}
