using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class TblFiscalYearMst
{
    public decimal FiscalYearId { get; set; }

    public string? FiscalYearUid { get; set; }

    public string? FiscalYearName { get; set; }

    public DateTime? FromDate { get; set; }

    public DateTime? Todate { get; set; }

    public decimal? AddedBy { get; set; }

    public DateTime? AddedOn { get; set; }

    public decimal? ModifiedBy { get; set; }

    public DateTime? ModifiedOn { get; set; }
}
