using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class FrDocumentType
{
    public int Lid { get; set; }

    public string SName { get; set; } = null!;

    public int? LUser { get; set; }

    public DateTime? DtDate { get; set; }

    public bool? BDel { get; set; }

    public string? OperationType { get; set; }

    public int? Compulsary { get; set; }

    public string? OperationMode { get; set; }
}
