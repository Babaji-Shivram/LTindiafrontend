using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsProductInvoiceLicense
{
    public long Lid { get; set; }

    public int JobId { get; set; }

    public int? InvoiceId { get; set; }

    public int? ProductId { get; set; }

    public int? ItemSrNo { get; set; }

    public int? LicenseId { get; set; }

    public decimal? LicenseDutyAmount { get; set; }

    public decimal? LicenseCifvalueAmount { get; set; }

    public int? LUser { get; set; }

    public bool BDel { get; set; }

    public DateTime DtDate { get; set; }

    public DateTime? UpdDate { get; set; }
}
