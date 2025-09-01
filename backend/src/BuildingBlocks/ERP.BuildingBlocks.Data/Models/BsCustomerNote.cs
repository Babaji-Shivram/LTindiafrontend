using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsCustomerNote
{
    public int LId { get; set; }

    public int CustId { get; set; }

    public int? ContractCustomerId { get; set; }

    public string Notes { get; set; } = null!;

    public DateOnly? StartDate { get; set; }

    public DateOnly? ValidTillDate { get; set; }

    public string? FilePath { get; set; }

    /// <summary>
    /// 1 for notes, 2 for Contract
    /// </summary>
    public int? NoteType { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public int? UpdUser { get; set; }

    public DateTime? UpdDate { get; set; }

    public bool BDel { get; set; }
}
