using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsJobErrorStat
{
    public int LId { get; set; }

    public long? JobId { get; set; }

    public string? STypeName { get; set; }

    public string? SErrorProcedure { get; set; }

    public string? SErrorMessage { get; set; }

    public string? SErrorNumber { get; set; }

    public string? SErrorSeverity { get; set; }

    public string? SErrorState { get; set; }

    public string? SErrorLine { get; set; }

    public string? SDescription { get; set; }

    public int? LUser { get; set; }

    public DateTime DtDate { get; set; }
}
