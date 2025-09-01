using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class InvVendorBuyDetail
{
    public int Lid { get; set; }

    public int InvoiceId { get; set; }

    public decimal VendorBuyValue { get; set; }

    public decimal VendorSellValue { get; set; }

    public decimal CustomerBuyValue { get; set; }

    public decimal CustomerSellValue { get; set; }

    public string Remark { get; set; } = null!;

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public bool Bdel { get; set; }

    public int? UpdUser { get; set; }

    public DateTime? UpdDate { get; set; }
}
