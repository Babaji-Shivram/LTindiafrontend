using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsPcddispatchDetail
{
    public int LId { get; set; }

    public int JobId { get; set; }

    public string? CarryingPerson { get; set; }

    public string? CourierName { get; set; }

    public string? DocketNo { get; set; }

    public string? ReceivedBy { get; set; }

    /// <summary>
    /// 1 for Hand Delivery and 2 for  Courier
    /// </summary>
    public int? TypeOfDelivery { get; set; }

    public DateTime? PcddeliveryDate { get; set; }

    public DateTime? DispatchDate { get; set; }

    /// <summary>
    /// 0 false for Billing Dept Dispatch and 1 true for PCA To Customer Dispatch
    /// </summary>
    public bool Pcdcustomer { get; set; }

    public string? DispatchDocPath { get; set; }

    public string? Remark { get; set; }

    public string? DispatchSignPath { get; set; }

    public string? ReceivedIdproof { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public bool BDel { get; set; }

    public string? CoveringLetter { get; set; }

    public int? ConsoleId { get; set; }

    public int? ModuleId { get; set; }

    public int? UpdUser { get; set; }

    public DateTime? UpdDate { get; set; }
}
