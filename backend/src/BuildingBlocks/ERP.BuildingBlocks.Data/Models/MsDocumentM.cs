using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class MsDocumentM
{
    public int Lid { get; set; }

    public string DocumentName { get; set; } = null!;

    public int? DocType { get; set; }

    public int ModuleId { get; set; }

    public string SRemarks { get; set; } = null!;

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public bool BDel { get; set; }

    public DateTime? UpdDate { get; set; }

    public int? UpdUser { get; set; }
}
