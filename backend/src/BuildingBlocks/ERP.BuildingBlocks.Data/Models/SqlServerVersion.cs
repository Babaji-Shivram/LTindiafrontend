using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class SqlServerVersion
{
    public byte MajorVersionNumber { get; set; }

    public short MinorVersionNumber { get; set; }

    public string Branch { get; set; } = null!;

    public string Url { get; set; } = null!;

    public DateOnly ReleaseDate { get; set; }

    public DateOnly MainstreamSupportEndDate { get; set; }

    public DateOnly ExtendedSupportEndDate { get; set; }

    public string MajorVersionName { get; set; } = null!;

    public string MinorVersionName { get; set; } = null!;
}
