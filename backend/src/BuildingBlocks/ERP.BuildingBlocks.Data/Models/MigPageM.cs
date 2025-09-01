using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class MigPageM
{
    public long PageId { get; set; }

    public string PageName { get; set; } = null!;

    public string PageLink { get; set; } = null!;

    public string MenuNode { get; set; } = null!;

    public long NodeSequence { get; set; }

    public long? ParentPage { get; set; }

    public long ChildNode { get; set; }

    public string? CTyp { get; set; }

    public string? CGsGpFlag { get; set; }

    public int? ModuleId { get; set; }

    public int? SrAppId { get; set; }

    public DateTime? DtDate { get; set; }

    public DateTime? UpdDate { get; set; }

    public string? Remark { get; set; }

    public bool BDel { get; set; }
}
