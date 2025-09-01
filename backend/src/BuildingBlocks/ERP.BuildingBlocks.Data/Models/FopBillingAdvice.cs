using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class FopBillingAdvice
{
    public int Lid { get; set; }

    public int EnqId { get; set; }

    public bool? IsAgentInvoiceRcvd { get; set; }

    public DateTime? AgentInvoiceRcvdDate { get; set; }

    public bool? IsFileSentToBilling { get; set; }

    public DateOnly? FileSentToBillingDate { get; set; }

    public string? Remark { get; set; }

    public int LUser { get; set; }

    public bool BDel { get; set; }

    public DateTime DtDate { get; set; }

    public DateTime? UpdDate { get; set; }

    public int? UpdUser { get; set; }
}
