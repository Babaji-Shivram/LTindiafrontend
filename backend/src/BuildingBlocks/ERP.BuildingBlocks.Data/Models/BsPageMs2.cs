using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsPageMs2
{
    public long PageId { get; set; }

    public string? PageName { get; set; }

    public string? PageIcon { get; set; }

    public string? PageLink { get; set; }

    public string? MenuNode { get; set; }

    public long? NodeSequence { get; set; }

    public long? ParentPage { get; set; }

    public long? ChildNode { get; set; }

    public string? CGsGpFlag { get; set; }

    public int? ModuleId { get; set; }

    public bool? IsView { get; set; }

    public bool? IsReadWrite { get; set; }

    public DateTime? DtDate { get; set; }

    public bool? BDel { get; set; }
}
