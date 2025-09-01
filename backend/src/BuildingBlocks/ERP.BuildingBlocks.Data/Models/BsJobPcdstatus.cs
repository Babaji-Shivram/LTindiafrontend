using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsJobPcdstatus
{
    public int Lid { get; set; }

    public int JobId { get; set; }

    public bool? PcdtoBackOffice { get; set; }

    public bool? PcdtoBillingAdvice { get; set; }

    public bool? PcdtoCustomer { get; set; }

    public bool? PcdtoScrutiny { get; set; }

    public bool? PcdtoBilling { get; set; }

    public bool? PcdtoDispatch { get; set; }

    public bool? PcdtoDispatchCustomer { get; set; }

    public bool? PcddraftInvoice { get; set; }

    public bool? PcdbillingChecking { get; set; }

    public bool? PcdfinalTyping { get; set; }

    public bool? PcdfinalChecking { get; set; }

    public bool? PcdtoBillDispatch { get; set; }

    public string? PcdfinalTypingComment { get; set; }

    public int? BillStatus { get; set; }

    /// <summary>
    /// 0 - LR Pending, 1 - LR Received, 2 - LR Not Required
    /// </summary>
    public int? BillLrstatus { get; set; }

    public DateTime? BillLrdate { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public int? UpdUser { get; set; }

    public DateTime? UpdDate { get; set; }

    public bool BDel { get; set; }

    public int? ModuleId { get; set; }
}
