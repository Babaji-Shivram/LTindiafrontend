using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class OdInvoiceStatus
{
    public int Lid { get; set; }

    public int RequestId { get; set; }

    public string? OdexRefNo { get; set; }

    public int LStatus { get; set; }

    public string Remark { get; set; } = null!;

    public string? RequestStatus { get; set; }

    public bool IsActive { get; set; }

    public bool IsFinal { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public bool BDel { get; set; }
}
