using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class FrEnquiryMailAttachPath
{
    public int LId { get; set; }

    public int? EnqId { get; set; }

    public int? DocType { get; set; }

    public string? GraphMessageKey { get; set; }

    public string? DocPath { get; set; }

    public string? FileName { get; set; }

    public DateTime? DtDate { get; set; }

    public DateTime? UpdDate { get; set; }

    public bool? BDel { get; set; }
}
