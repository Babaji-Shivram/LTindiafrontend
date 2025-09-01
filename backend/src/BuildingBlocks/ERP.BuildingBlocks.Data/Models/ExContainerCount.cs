using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class ExContainerCount
{
    public long LId { get; set; }

    public long JobId { get; set; }

    public int? CountTotal { get; set; }

    public int? Count20 { get; set; }

    public int? Count40 { get; set; }

    public int? CountLcl { get; set; }

    /// <summary>
    /// Twenty Equivalent Unit
    /// </summary>
    public int Teu { get; set; }

    public DateTime DtDate { get; set; }
}
