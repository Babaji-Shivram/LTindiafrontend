using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsShipCompDetail
{
    public int Lid { get; set; }

    public string? Scode { get; set; }

    public string? ContactName { get; set; }

    public string? EmailId { get; set; }

    public string? MobileNo { get; set; }

    public string? ContactNo { get; set; }

    public string? Address { get; set; }

    public int? LUser { get; set; }

    public DateOnly? DtDate { get; set; }

    public int? UpdUser { get; set; }

    public DateOnly? UpdDate { get; set; }

    public string? BDel { get; set; }
}
