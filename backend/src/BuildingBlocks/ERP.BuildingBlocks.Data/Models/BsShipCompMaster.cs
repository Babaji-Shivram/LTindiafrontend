using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class BsShipCompMaster
{
    public int Lid { get; set; }

    public string? Scode { get; set; }

    public string? CompName { get; set; }

    public string? Saddress { get; set; }

    public string? ShippingLineCode { get; set; }

    public string? TestCode { get; set; }

    public int? LUser { get; set; }

    public DateOnly? DtDate { get; set; }

    public int? UpdUser { get; set; }

    public DateOnly? UpdDate { get; set; }

    public string? BDel { get; set; }
}
