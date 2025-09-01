using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsPcdscanDocumentDetail
{
    public long Lid { get; set; }

    public int? JobId { get; set; }

    public int? DocId { get; set; }

    public string? Docpath { get; set; }

    public string? FileName { get; set; }

    public int? LUser { get; set; }

    public DateTime? Dtdate { get; set; }

    public int? Bdel { get; set; }

    public int? Uploadby { get; set; }
}
