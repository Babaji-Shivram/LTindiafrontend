using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsQuotationChargesM
{
    public int Lid { get; set; }

    public int? QuoteCategoryId { get; set; }

    public string? SName { get; set; }

    public string? SDescription { get; set; }

    public int? LUser { get; set; }

    public DateTime? DtDate { get; set; }

    public bool? BDel { get; set; }
}
