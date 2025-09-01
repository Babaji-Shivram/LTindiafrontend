using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsPaymentTypeDetail
{
    public int LId { get; set; }

    /// <summary>
    /// Function Type ie 1 for DO Payment, 2 For Duty Payment Type, 3 For Expense Payment Type
    /// </summary>
    public int TypeId { get; set; }

    public int PayTypeId { get; set; }

    public DateTime DtDate { get; set; }

    public bool BDel { get; set; }
}
