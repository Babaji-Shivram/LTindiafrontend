using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsPcddispatchDetailShadow
{
    public long AuditId { get; set; }

    public int LId { get; set; }

    public int JobId { get; set; }

    public string? CarryingPerson { get; set; }

    public string? CourierName { get; set; }

    public string? DocketNo { get; set; }

    public string? ReceivedBy { get; set; }

    public int? TypeOfDelivery { get; set; }

    public DateTime? PcddeliveryDate { get; set; }

    public DateTime? DispatchDate { get; set; }

    public bool Pcdcustomer { get; set; }

    public string? DispatchDocPath { get; set; }

    public string? Remark { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public bool BDel { get; set; }

    public string AuditAction { get; set; } = null!;

    public DateTime AuditDate { get; set; }

    public string AuditUser { get; set; } = null!;

    public string? AuditApp { get; set; }
}
