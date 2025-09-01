using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class TblInvoiceDet
{
    public decimal InvDetId { get; set; }

    public string? InvoiceNo { get; set; }

    public DateTime? InvoiceDate { get; set; }

    public string? Particulars { get; set; }

    public decimal? Rate { get; set; }

    public decimal? Qty { get; set; }

    public decimal? Gst { get; set; }

    public decimal? Amt { get; set; }

    public decimal? AddedBy { get; set; }

    public DateTime? AddedOn { get; set; }

    public decimal? ModifiedBy { get; set; }

    public DateTime? ModifiedOn { get; set; }

    public decimal? NoOfPackages { get; set; }

    public decimal? AmountWithOutGst { get; set; }

    public int? CbDetailsLid { get; set; }
}
