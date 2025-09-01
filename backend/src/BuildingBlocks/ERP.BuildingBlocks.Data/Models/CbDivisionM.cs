using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class CbDivisionM
{
    public int LId { get; set; }

    public string DivisionName { get; set; } = null!;

    public string? DivisionCode { get; set; }

    public string? SRemarks { get; set; }

    public int? CreatedUser { get; set; }

    public DateTime CreatedDate { get; set; }

    public bool IsActive { get; set; }

    public string? DivisionHodname { get; set; }

    public string? Email { get; set; }

    public decimal? DivisionManualId { get; set; }

    public string? DraftBookCode { get; set; }
}
