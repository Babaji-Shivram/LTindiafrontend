using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class OdStatusM
{
    public int Lid { get; set; }

    public string StatusName { get; set; } = null!;

    /// <summary>
    /// 1- Odex Invoice Request, 2- Payment Request, 3 DO Request
    /// </summary>
    public int LTypeId { get; set; }

    public int LUser { get; set; }

    public DateTime DtDate { get; set; }

    public bool Bdel { get; set; }
}
