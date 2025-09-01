using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsAutoJobSeaExpense
{
    public long LId { get; set; }

    public long JobId { get; set; }

    public long? DeliveryId { get; set; }

    public int AutoExpenseId { get; set; }

    public int? ContainerId { get; set; }

    public int? PaidCharges { get; set; }

    /// <summary>
    /// 1 For Customer 2 For Warehouse
    /// </summary>
    public int ExpenseFor { get; set; }

    public int? CfsuserId { get; set; }

    public int? IsApproved { get; set; }

    public int? ApprovedBy { get; set; }

    public DateTime? ApprovalDate { get; set; }

    public string? Remark { get; set; }

    public string? SystemRefNo { get; set; }

    public bool? IsJbpost { get; set; }

    public int? LUser { get; set; }

    public DateTime DtDate { get; set; }

    public DateTime? UpdDate { get; set; }

    public bool BDel { get; set; }
}
