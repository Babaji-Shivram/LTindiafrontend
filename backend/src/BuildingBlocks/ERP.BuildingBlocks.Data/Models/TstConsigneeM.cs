using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class TstConsigneeM
{
    public int Lid { get; set; }

    public string ConsigneeName { get; set; } = null!;

    public string? SCode { get; set; }

    public string? Address { get; set; }

    public string? ContactNo { get; set; }

    public string? ConsigneeGroup { get; set; }

    public string? Email { get; set; }

    public string? Iecno { get; set; }

    public string? IncomeTaxNum { get; set; }

    public string? Remark { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public bool BDel { get; set; }
}
