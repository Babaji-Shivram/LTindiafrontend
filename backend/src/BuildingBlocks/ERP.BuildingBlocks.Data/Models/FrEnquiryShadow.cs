using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class FrEnquiryShadow
{
    public long AuditId { get; set; }

    public int Lid { get; set; }

    public string EnqrefNo { get; set; } = null!;

    public string? OldRefNo { get; set; }

    public DateOnly Enqdate { get; set; }

    public string? FrjobNo { get; set; }

    public string? Customer { get; set; }

    public int? CustId { get; set; }

    public string? CustRefNo { get; set; }

    public int LType { get; set; }

    public int LMode { get; set; }

    public int LStatus { get; set; }

    public int? SalesRepId { get; set; }

    public int LostStatusId { get; set; }

    public int? FinYear { get; set; }

    public string? DocDir { get; set; }

    public DateTime DtDate { get; set; }

    public int LUser { get; set; }

    public int? CreatedBy { get; set; }

    public DateTime? UpdDate { get; set; }

    public int? UpdUser { get; set; }

    public bool BDel { get; set; }

    public string AuditAction { get; set; } = null!;

    public DateTime AuditDate { get; set; }

    public string AuditUser { get; set; } = null!;

    public string? AuditApp { get; set; }
}
