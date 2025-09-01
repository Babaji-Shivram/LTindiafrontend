using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class GstGstDetail
{
    public int Lid { get; set; }

    public int? CustomerId { get; set; }

    public int? GstaddressId { get; set; }

    public string? NameOfCompanies { get; set; }

    public string? Branch { get; set; }

    public string? Address { get; set; }

    public string? PersonName { get; set; }

    public string? PersonNo { get; set; }

    public string? PersonEmailId { get; set; }

    public string? GstProvistionId { get; set; }

    public string? GstnArnNo { get; set; }

    public string? FuUplode { get; set; }

    public int? LUser { get; set; }

    public bool? BDel { get; set; }

    public DateTime? DtDate { get; set; }
}
